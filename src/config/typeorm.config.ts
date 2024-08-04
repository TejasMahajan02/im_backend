import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Otp } from 'src/common/modules/otp/entities/otp.entity';
import { CaseSupport } from 'src/modules/case/entities/case-support.entity';
import { CaseType } from 'src/modules/case/entities/case-type.entity';
import { Case } from 'src/modules/case/entities/case.entity';
import { Specialization } from 'src/modules/case/entities/specialization.entity';
import { TreatmentPlan } from 'src/modules/case/entities/treatment-plan.entity';
import { DoctorInfo } from 'src/modules/doctor/entities/doctor-info.entity';
import { OrgDoctor } from 'src/modules/doctor/entities/org-doctor.entity';
import { Organization } from 'src/modules/org/entities/org.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Otp,
    Organization,
    OrgDoctor,
    DoctorInfo,
    Case,
    TreatmentPlan,
    CaseSupport,
    CaseType,
    Specialization
  ],
  autoLoadEntities: true,
  synchronize: true,
};
