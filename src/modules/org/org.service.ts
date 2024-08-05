import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/org.entity';
import { OrgInviteDto } from './dto/org-invite.dto';

@Injectable()
export class OrgService {
    constructor(
        @InjectRepository(Organization)
        private orgRepository: Repository<Organization>,
    ) { }

    async findOneByRegNo(regNo: number): Promise<Organization | null> {
        return await this.orgRepository.findOneBy({ regNo, isDeleted: false });
    }

    async createOrg(orgInviteDto: OrgInviteDto, createdBy : string) {
        const org = new Organization();
        org.name = orgInviteDto.orgName;
        org.phone = {mo : orgInviteDto.phone};
        org.address1 = orgInviteDto.streetAddress;
        org.city = orgInviteDto.city;
        org.state= orgInviteDto.state;
        org.country= orgInviteDto.countryCode;
        org.regNo = orgInviteDto.regNo;
        org.createdBy = createdBy; // Admin id/email

        return await this.orgRepository.save(org);
    }
}
