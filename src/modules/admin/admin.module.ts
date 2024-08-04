import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/common/modules/auth/auth.module';

@Module({
  imports : [AuthModule],
  providers : [],
  controllers: [AdminController],
})
export class AdminModule {}
