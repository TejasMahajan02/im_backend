import { CaseStatus } from "src/common/enum/case-status.enum";
import { OrgDoctor } from "src/modules/doctor/entities/org-doctor.entity";
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { TreatmentPlan } from "./treatment-plan.entity";
import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class Case extends BaseEntity {
    @Column({ type: 'jsonb', nullable: false })
    patientDetails: object;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    support: string;

    @Column({ nullable: true })
    desc: string;

    @Column({ default: CaseStatus.New })
    status: string;

    @Column({ default: false })
    isFavorite: boolean;

    @Column({ type: 'jsonb', nullable: true })
    images: object;

    @Column({ type: 'jsonb', nullable: true })
    videos: object;

    @Column({ nullable: false })
    treatmentPlan: string;

    @Column("text", { array: true, nullable: false })
    mentors: object;

    @Column({ nullable: true })
    emergencyContactName: string;

    @Column({ nullable: true })
    emergencyContactRelationship: string;

    @Column({ nullable: true })
    allergies: string;

    @Column({ nullable: true })
    currentMedications: string;

    @Column({ nullable: true })
    previousDentalTreatments: string;

    @Column({ nullable: true })
    generalHealthStatus: string;

    // One case can have only one org doctor
    @OneToOne(() => OrgDoctor, orgDoctor => orgDoctor.case)
    @JoinColumn()
    orgDoctor : OrgDoctor

    // One case can have many treatment plans
    @OneToMany(() => TreatmentPlan, treatmentPlan => treatmentPlan.case, {
        cascade: true,
    })
    @JoinColumn()
    treatmentPlans: TreatmentPlan[];
}
