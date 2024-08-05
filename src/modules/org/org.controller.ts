import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { ExpressRequest } from 'src/common/decorators/express-request.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthController } from 'src/common/modules/auth/auth.controller';
import { AuthService } from 'src/common/modules/auth/auth.service';
import { UserService } from '../user/user.service';
import { OrgInviteDto } from './dto/org-invite.dto';

@Controller('org')
export class OrgController extends AuthController {
    constructor(
        authService: AuthService,
        private readonly userService: UserService,

    ) {
        super(authService);
    }

}
