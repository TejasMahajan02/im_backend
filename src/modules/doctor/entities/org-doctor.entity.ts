import { BaseInviteEntity } from 'src/common/entities/base-invite.entity';

import { Organization } from 'src/modules/org/entities/org.entity';
import { Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DoctorInfo } from './doctor-info.entity';
import { Case } from 'src/modules/case/entities/case.entity';
import { TreatmentPlan } from 'src/modules/case/entities/treatment-plan.entity';

@Entity()
export class OrgDoctor extends BaseInviteEntity {
    // One org can have many doctors
    @ManyToOne(() => Organization, organization => organization.orgDoctors)
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @ManyToOne(() => DoctorInfo, doctorInfo => doctorInfo.orgDoctor)
    @JoinColumn({ name: 'doctorId' })
    doctorInfo: DoctorInfo;

    // One doctor can have many cases
    @OneToMany(() => Case, caseEntity =>  caseEntity.orgDoctor)
    case : Case;

    // One doctor/mentor can have many treatment plans
    @OneToMany(() => TreatmentPlan, treatmentPlans => treatmentPlans.orgDoctor)
    treatmentPlans : TreatmentPlan[];
}
