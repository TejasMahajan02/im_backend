import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { Role } from 'src/common/enum/role.enum';
import { AuthService } from 'src/common/modules/auth/auth.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthController } from 'src/common/modules/auth/auth.controller';
import { ExpressRequest } from 'src/common/decorators/express-request.decorator';
import { UserService } from '../user/user.service';

@Controller('admin')
export class AdminController extends AuthController {
    constructor(
        authService: AuthService,
        private readonly userService : UserService
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

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    async dashboard(@Req() req: ExpressRequest) {
        const userId = req.user.uuid;
        console.log(await this.userService.findOneById(userId));
        return `${req.user.uuid}`;
    }

}
