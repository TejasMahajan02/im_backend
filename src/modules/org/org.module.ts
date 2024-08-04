import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/org.entity';
import { AuthModule } from 'src/common/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    AuthModule,
  ],
  providers: [],
  controllers: [OrgController]
})
export class OrgModule { }
