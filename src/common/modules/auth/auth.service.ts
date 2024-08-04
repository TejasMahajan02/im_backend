import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../modules/user/user.service';
import { PasswordService } from 'src/common/services/password.service';
import { OtpService } from 'src/common/modules/otp/otp.service';
import { EmailService } from 'src/common/modules/email/email.service';
import { JwtUtilService } from 'src/common/services/jwt.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { OtpMessages, UserMessages } from 'src/common/constants/messages';
import { SignInUserDto } from '../../dto/sign-in-user.dto';
import { VerifyOtpDto } from 'src/common/modules/otp/dto/verify-otp.dto';
import { ForgetPasswordDto } from '../../dto/forget-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly jwtUtilService: JwtUtilService,
        private readonly otpService: OtpService,
        private readonly emailService: EmailService,
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        // Validate user exist or not?
        if (await this.userService.findOneByEmail(createUserDto.email)) {
            throw new ConflictException(UserMessages.isExist);
        }

        // Create one time password and hash it
        const password = this.passwordService.generateRandomPassword();
        const hashedPassword = await this.passwordService.hashPassword(password);

        // Update hashed password and save to database 
        createUserDto.password = hashedPassword;
        const user = await this.userService.save(createUserDto);
        if (!user) {
            throw new InternalServerErrorException(UserMessages.unexpectedError);
        }

        // Send one time generated password to user
        await this.emailService.sendOneTimePassword(user.email, password);

        return { message: UserMessages.ok };
    }

    async signIn(signInUserDto: SignInUserDto) {
        // Check user existance
        const user = await this.userService.findOneByEmail(signInUserDto.email);
        if (!user) {
            throw new NotFoundException(UserMessages.notFound);
        }

        // Validate user password
        if (!await this.passwordService.comparePasswords(signInUserDto.password, user.password)) {
            throw new BadRequestException(UserMessages.invalidPassword);
        }

        // Create or update otp and send to user email
        return await this.createOrUpdateOtp(user.email, user.role);
    }

    async createOrUpdateOtp(email: string, role: string) {
        // Generate otp and hash it
        const otp = this.otpService.generateNumericOTP();
        const hashedOtp = await this.passwordService.hashPassword(otp);

        // Find the user by email
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException(UserMessages.notFound);
        }

        // Check if an OTP record already exists for the given email
        let otpEntity = await this.otpService.findOneByEmail(email);

        // Get current date
        const currentDate = new Date()

        if (otpEntity) {
            // If the OTP record exists, update the otp and createdAt fields
            otpEntity.otp = hashedOtp;
            otpEntity.createdAt = currentDate; // Update the createdAt field to current time
            otpEntity.modifiedAt = currentDate; // Used to identify first-time login or not
        } else {
            // If the OTP record does not exist, create a new record
            otpEntity = this.otpService.create(email, role, hashedOtp, currentDate);

            // Set the user in the OTP entity
            otpEntity.user = user;
        }

        // Save the OTP entity to the database
        const savedOtpEntity = await this.otpService.save(otpEntity);

        if (!savedOtpEntity) {
            throw new InternalServerErrorException(OtpMessages.unexpectedError);
        }

        // Send the verification key to the user's email
        await this.emailService.sendVerificationKey(savedOtpEntity.email, otp);

        // send a successful message of OTP creation
        return { message: OtpMessages.otpSent + ' ' + this.maskEmail(savedOtpEntity.email) };
    }


    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<object> {
        // Varify otp user
        const otpUser = await this.otpService.findOneByEmail(verifyOtpDto.email);
        if (!otpUser) {
            throw new NotFoundException();
        }

        // Check otp expiry
        if (this.otpService.isExpired(otpUser.createdAt)) {
            throw new BadRequestException(OtpMessages.otpExpired);
        }

        // Compare input otp with stored otp
        // We need to format otp because we can't compare number with store otp string
        if (!await this.passwordService.comparePasswords(`${verifyOtpDto.otp}`, otpUser.otp)) {
            throw new BadRequestException(OtpMessages.invalidOtp);
        }

        // Send response to update temporary password only for first time logged in user
        if (!otpUser.isLoggedBefore) {
            return { message: OtpMessages.okAndUpdatePassword }
        }

        // Grab userId and user role and store into jwt token
        const { user } = otpUser;
        const { uuid, role } = user;
        return await this.jwtUtilService.grantToken({ uuid, role });
    }

    async updatePassword(signInUserDto: SignInUserDto): Promise<object> {
        // Check user existance
        const user = await this.userService.findOneByEmail(signInUserDto.email);
        if (!user) {
            throw new NotFoundException(UserMessages.notFound);
        }

        // Hashed password before storing into database
        const hashPassword = await this.passwordService.hashPassword(signInUserDto.password);

        // Update password
        user.password = hashPassword;
        user.modifiedAt = new Date();
        user.modifiedBy = user.uuid;
        const result = await this.userService.save(user);

        // Throw error if update failed
        if (!result) {
            throw new InternalServerErrorException(UserMessages.unexpectedError);
        }

        // Mark IsLoggedBefore to true to identify about user updated his password
        await this.otpService.updateIsLoggedBefore(user.email);

        return { message: UserMessages.passwordUpdated };
    }


    async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
        // Check user existance
        const user = await this.userService.findOneByEmail(forgetPasswordDto.email);
        if (!user) {
            throw new NotFoundException(UserMessages.notFound);
        }

        // Create or update otp and send it to user email
        const otp = await this.createOrUpdateOtp(user.email, user.role);

        if (!otp) {
            throw new InternalServerErrorException(OtpMessages.unexpectedError);
        }

        return { message: OtpMessages.otpSent + ' ' + this.maskEmail(user.email) };
    }

    async deleteOne(id: string): Promise<object> {
        // Check user existance by uuid/id
        const user = await this.userService.findOneById(id);
        if (!user) {
            throw new NotFoundException(UserMessages.notFound);
        }

        // Mark as deleted
        user.isDeleted = true;
        const result = this.userService.save(user);

        if (!result) {
            throw new InternalServerErrorException(OtpMessages.unexpectedError);
        }

        return { message: UserMessages.userDeleted };
    }

    // Optional
    maskEmail(email: string, maskDomain: boolean = false): string {
        const [localPart, domain] = email.split('@');
        const visibleLocalChars = 4;
        const maskedLocalPart = localPart.slice(0, visibleLocalChars) + '*'.repeat(localPart.length - visibleLocalChars);

        if (maskDomain) {
            const visibleDomainChars = 2;
            const [domainName, domainExtension] = domain.split('.');
            const maskedDomainName = domainName.slice(0, visibleDomainChars) + '*'.repeat(domainName.length - visibleDomainChars);
            return `${maskedLocalPart}@${maskedDomainName}.${domainExtension}`;
        }

        return `${maskedLocalPart}@${domain}`;
    }
}
