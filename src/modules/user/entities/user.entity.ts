import { BaseEntity } from 'src/common/entities/base.entity';
import { Otp } from 'src/common/modules/otp/entities/otp.entity';
import { DoctorInfo } from 'src/modules/doctor/entities/doctor-info.entity';
import { Organization } from 'src/modules/org/entities/org.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

// Credentials table
@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  role: string;

  // One user can only have one otp
  @OneToOne(() => Otp, otp => otp.user)
  // @JoinColumn({ name: 'otpId' })
  otp: Otp;

  // One user can only have one doctor info
  @OneToOne(() => DoctorInfo, doctorInfo => doctorInfo.user)
  @JoinColumn()
  doctorInfo: DoctorInfo;

  // One user can only have one organization registered
  @OneToOne(() => Organization, organization => organization.user)
  @JoinColumn()
  organization: Organization;
}
