import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class BaseName extends BaseEntity {
    @Column({ nullable: false })
    name: string;
}
