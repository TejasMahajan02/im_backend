import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../../common/dto/create-user.dto';

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

    async save(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(createUserDto);
    }
}
