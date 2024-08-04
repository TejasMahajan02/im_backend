import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from 'src/common/dto/sign-in-user.dto';
import { VerifyOtpDto } from '../otp/dto/verify-otp.dto';
import { ForgetPasswordDto } from 'src/common/dto/forget-password.dto';

@Controller('auth')
export abstract class AuthController {
    constructor(
        protected readonly authService: AuthService
    ) { }

    @Post('login')
    async signIn(@Body() signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto);
    }

    @Post('resend')
    async resendOtp(@Body() signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto);
    }

    @Post('verify')
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.authService.verifyOtp(verifyOtpDto);
    }

    @Post('set-password')
    async setPassword(@Body() signInUserDto: SignInUserDto) {
        return this.authService.updatePassword(signInUserDto);
    }

    @Post('forget-password')
    async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
        return await this.authService.forgetPassword(forgetPasswordDto);
    }
}
