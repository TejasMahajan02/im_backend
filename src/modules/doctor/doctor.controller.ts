import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthController } from 'src/common/modules/auth/auth.controller';
import { AuthService } from 'src/common/modules/auth/auth.service';
import { OrgDoctor } from './entities/org-doctor.entity';
import { DoctorService } from './doctor.service';
import { NameDto } from 'src/common/dto/name.dto';

@Controller('doctor')
export class DoctorController extends AuthController {
    constructor(
        authService: AuthService,
        private readonly doctorService: DoctorService,
    ) {
        super(authService);
    }

    // List of mentors
    @Get('mentors')
    async getAllMentors(): Promise<OrgDoctor[] | null> {
        return await this.doctorService.getAllMentors();
    }

    // Used for select dropdown
    @Post('specialization')
    async addSpecialization(@Body() nameDto: NameDto): Promise<object> {
        return await this.doctorService.addSpecialization(nameDto);
    }

    @Get('specialization')
    async getAllSpecializations(): Promise<object> {
        return await this.doctorService.getAllSpecializations();
    }

}
