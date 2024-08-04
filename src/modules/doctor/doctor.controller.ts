import { Controller } from '@nestjs/common';
import { AuthController } from 'src/common/modules/auth/auth.controller';
import { AuthService } from 'src/common/modules/auth/auth.service';

@Controller('doctor')
export class DoctorController extends AuthController {
    constructor(
        authService: AuthService,
    ) {
        super(authService);
    }

}
