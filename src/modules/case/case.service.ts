import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseSupport } from './entities/case-support.entity';
import { CaseType } from './entities/case-type.entity';
import { Case } from './entities/case.entity';
import { Specialization } from './entities/specialization.entity';
import { NameDto } from './dto/name.dto';

@Injectable()
export class CaseService {
    constructor(
        @InjectRepository(Case)
        private caseRepository: Repository<Case>,

        @InjectRepository(CaseSupport)
        private caseSupportRepository: Repository<CaseSupport>,

        @InjectRepository(CaseType)
        private caseTypeRepository: Repository<CaseType>,

        @InjectRepository(Specialization)
        private specializationRepository: Repository<Specialization>
    ) { }

    
    // Used for select dropdown
    async addCaseSupport(nameDto: NameDto): Promise<object> {
        try {
            return await this.caseSupportRepository.save(nameDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllCaseSupports(): Promise<object> {
        return await this.caseSupportRepository.find({});
    }

    async addCaseType(nameDto: NameDto): Promise<object> {
        try {
            return await this.caseTypeRepository.save(nameDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllCaseTypes(): Promise<object> {
        return await this.caseTypeRepository.find({});
    }

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
}
