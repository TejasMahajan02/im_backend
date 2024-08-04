import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  otp: string;

  // One user can only have one otp
  @OneToOne(() => User, user => user.otp)
  @JoinColumn({ name: 'userId' })
  user: User;
}
