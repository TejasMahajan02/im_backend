import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/common/modules/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports : [AuthModule, UserModule],
  providers : [],
  controllers: [AdminController],
})
export class AdminModule {}
