import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CaseService } from './case.service';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CreateCaseDto } from './dto/create-case.dto';
import { NameDto } from '../../common/dto/name.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('case')
export class CaseController {
    constructor(
        private readonly caseService: CaseService,
    ) { }

    // Used for select dropdown
    @Post('case-support')
    async addCaseSupport(@Body() nameDto: NameDto): Promise<object> {
        return await this.caseService.addCaseSupport(nameDto);
    }

    @Get('case-support')
    async getAllCaseSupports(): Promise<object> {
        return await this.caseService.getAllCaseSupports();
    }

    // Used for select dropdown
    @Post('case-type')
    async addCaseType(@Body() nameDto: NameDto): Promise<object> {
        return await this.caseService.addCaseType(nameDto);
    }

    @Get('case-type')
    async getAllCaseTypes(): Promise<object> {
        return await this.caseService.getAllCaseTypes();
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Doctor)
    async createCase(@Body() createCaseDto: CreateCaseDto): Promise<object> {
        return await this.caseService.createCase(createCaseDto);
    }

    @Get()
    async getAllCase(limit: number = 12, offset: number = 0, order: number = 1): Promise<object> {
        return await this.caseService.getAllCase();
    }

    @Get(':id')
    async getCase(@Param() id: string): Promise<object> {
        return await this.caseService.getCase(id);
    }

    @Delete(':id')
    async deleteCase(@Param() id: string): Promise<object> {
        return await this.caseService.deleteCase(id);
    }

    @Patch('id')
    async updateCase(@Param() id: string, @Body() updateCaseDto: UpdateCaseDto): Promise<object> {
        return await this.caseService.updateCase(id, updateCaseDto);
    }
}
