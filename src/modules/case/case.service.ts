import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseSupport } from './entities/case-support.entity';
import { CaseType } from './entities/case-type.entity';
import { Case } from './entities/case.entity';
import { Specialization } from '../doctor/entities/specialization.entity';
import { NameDto } from '../../common/dto/name.dto';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseMessages } from 'src/common/constants/messages';

@Injectable()
export class CaseService {
    constructor(
        @InjectRepository(Case)
        private caseRepository: Repository<Case>,

        @InjectRepository(CaseSupport)
        private caseSupportRepository: Repository<CaseSupport>,

        @InjectRepository(CaseType)
        private caseTypeRepository: Repository<CaseType>,


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

    async createCase(createCaseDto: CreateCaseDto): Promise<object> {
        return await this.caseRepository.save(createCaseDto);
    }

    async getAllCase(): Promise<object> {
        return await this.caseRepository.find({});
    }

    async getCase(id: string): Promise<object> {
        try {
            return await this.caseRepository.findBy({ uuid: id });
        } catch (error) {
            throw new NotFoundException(CaseMessages.notFound);
        }
    }

    async updateCase(id: string, updateCaseDto: UpdateCaseDto): Promise<object> {
        return await this.caseRepository.update({ uuid: id }, updateCaseDto);
    }

    async deleteCase(id: string): Promise<object> {
        return await this.caseRepository.update({ uuid: id }, { isDeleted: true });
    }
}
