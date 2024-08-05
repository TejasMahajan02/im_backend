import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../../common/dto/create-user.dto';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneById(uuid: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { uuid, isDeleted: false }, relations: ['otp'] });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email, isDeleted: false }, relations: ['otp'] });
    }

    async findOrgByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email, isDeleted: false }, relations: ['organization'] });
    }

    async save(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(createUserDto);
    }

    
    async adminDashboard(email: string, numberOfRecords: number = 5, sortOrder: number = -1) {
        const order = sortOrder === 1 ? "ASC" : "DESC";
        return await this.usersRepository.find({
            relations: {
                organization: true,
            },
            where: {
                role: Role.Organization,
                createdBy: email,
                isDeleted: false,
            },
            order: {
                createdAt: order,
            },
            take: numberOfRecords,
        });
    }
    

    async orgDashboard(email: string, numberOfRecords: number = 5, sortOrder: number = -1) {
        const order = sortOrder === 1 ? "ASC" : "DESC";
        return await this.usersRepository.find({
            relations: {
                doctorInfo: true,
            },
            where: {
                role: Role.Doctor,
                createdBy: email,
                isDeleted: false,
            },
            order: {
                createdAt: order,
            },
            take: numberOfRecords,
        });
    }

}
