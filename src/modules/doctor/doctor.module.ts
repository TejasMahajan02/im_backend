import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorInfo } from './entities/doctor-info.entity';
import { OrgDoctor } from './entities/org-doctor.entity';
import { AuthModule } from 'src/common/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorInfo, OrgDoctor]),
    AuthModule,
  ],
  providers: [],
  controllers: [DoctorController]
})
export class DoctorModule {}
