import { IsNotEmpty, IsString } from 'class-validator';
import { BaseInviteDto } from 'src/common/dto/base-invite.dto';

export class OrgInviteDto extends BaseInviteDto {
  @IsNotEmpty()
  @IsString()
  orgName: string;
}
