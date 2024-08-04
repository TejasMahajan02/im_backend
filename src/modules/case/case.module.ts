import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { CaseSupport } from './entities/case-support.entity';
import { CaseType } from './entities/case-type.entity';
import { Specialization } from './entities/specialization.entity';
import { TreatmentPlan } from './entities/treatment-plan.entity';
import { CaseService } from './case.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Case,
      CaseSupport,
      CaseType,
      Specialization,
      TreatmentPlan
    ])
  ],
  controllers: [CaseController],
  providers: [CaseService]
})
export class CaseModule {}
