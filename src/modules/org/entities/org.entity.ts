import { BaseInviteEntity } from 'src/common/entities/base-invite.entity';
import { OrgDoctor } from 'src/modules/doctor/entities/org-doctor.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Organization extends BaseInviteEntity {
    // @Generated('uuid')
    // orgId: string;

    @Column({ nullable: false })
    name: string;

    @Column({ type: 'jsonb', nullable: false })
    phone: object;

    @Column({ nullable: false })
    address1: string;

    @Column({ nullable: true })
    address2: string;

    @Column({ nullable: true })
    address3: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: false, unique: true })
    regNo: number;

    // One doctor info can only have one user/credentials
    @OneToOne(() => User, user => user.organization)
    @JoinColumn()
    user: User;

    // One organization can have many doctors
    @OneToMany(() => OrgDoctor, orgDoctor => orgDoctor.organization)
    orgDoctors: OrgDoctor[];
}