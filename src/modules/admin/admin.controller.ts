import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { Role } from 'src/common/enum/role.enum';
import { AuthService } from 'src/common/modules/auth/auth.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthController } from 'src/common/modules/auth/auth.controller';

@Controller('admin')
export class AdminController extends AuthController {
    constructor(
        authService: AuthService,
    ) {
        super(authService);
    }

    @Post('register')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    async create(@Body() createUserDto: CreateUserDto): Promise<object> {
        createUserDto.role = Role.SuperAdmin;
        createUserDto.createdBy = 'Developer';
        return await this.authService.signUp(createUserDto);
    }

}
