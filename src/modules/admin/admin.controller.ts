import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { Role } from 'src/common/enum/role.enum';
import { AuthService } from 'src/common/modules/auth/auth.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthController } from 'src/common/modules/auth/auth.controller';
import { ExpressRequest } from 'src/common/decorators/express-request.decorator';
import { UserService } from '../user/user.service';
import { OrgInviteDto } from '../org/dto/org-invite.dto';
import { OrgService } from '../org/org.service';
import { UserMessages } from 'src/common/constants/messages';

@Controller('admin')
export class AdminController extends AuthController {
    constructor(
        authService: AuthService,
        private readonly userService : UserService,
        private readonly orgService : OrgService,
    ) {
        super(authService);
    }

    @Post('register')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles(Role.SuperAdmin)
    async create(@Body() createUserDto: CreateUserDto): Promise<object> {
        createUserDto.role = Role.SuperAdmin;
        return await this.authService.signUp(createUserDto);
    }

    // @Get()
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles(Role.SuperAdmin)
    // async dashboard(@Req() req: ExpressRequest) {
    //     const userId = req.user.uuid;
    //     console.log(await this.userService.findOneById(userId));
    //     return `${req.user.uuid}`;
    // }

    
    // Admin Dashboard which shows all the invited orgs
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    async dashboard(@Req() req: ExpressRequest) {
        const allOrganizations = await this.userService.adminDashboard(req.user.email);
        if (allOrganizations.length === 0) {
            return { message: "no organization has been found." }
        }

        return allOrganizations;
    }

     // // Organization invite
    @Post('invite')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    async inviteOrg(
        @Req() req: ExpressRequest,
        @Body() orgInviteDto: OrgInviteDto
    ) {
        // When inviting organizations we must validate email & registration number
        const orgUser = await this.userService.findOrgByEmail(orgInviteDto.email);
        if (orgUser) {
            throw new ConflictException(UserMessages.isExist);
        }

        if(orgUser.organization.regNo) {
            throw new ConflictException('Registration number has been already used.');
        }

        // if (await this.orgService.findOneByRegNo(orgInviteDto.regNo)) {
        //     throw new ConflictException('Registration number has been already used.');
        // }

        const orgEntity = await this.orgService.createOrg(orgInviteDto, req.user.uuid);


        // const userEntity = await this.userService.createUser({
        //     email: orgInviteDto.email,
        //     password: "orgUser",
        //     createdBy: req.user.email,
        //     role: Role.Organization,
        //     organization: orgEntity
        // })

        // if (!userEntity) throw new InternalServerErrorException();

        return { message: "Organization has been successfully invited." }

        // return await this.userService.create({
        //     email: orgInviteDto.email,
        //     role: Role.Organization,
        //     createdBy: req.user.email
        // });
    }

}
