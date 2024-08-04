import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgDoctor } from './entities/org-doctor.entity';
import { Specialization } from './entities/specialization.entity';
import { NameDto } from 'src/common/dto/name.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(OrgDoctor)
        private orgDoctorRepository: Repository<OrgDoctor>,

        @InjectRepository(Specialization)
        private specializationRepository: Repository<Specialization>
    ) { }

    async addSpecialization(nameDto: NameDto): Promise<object> {
        try {
            return await this.specializationRepository.save(nameDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllSpecializations(): Promise<object> {
        return await this.specializationRepository.find({});
    }

    async getAllMentors() : Promise<OrgDoctor[] | null> {
        return await this.orgDoctorRepository.find({});
    }
}
