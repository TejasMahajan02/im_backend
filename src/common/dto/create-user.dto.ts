import { EmailDto } from "src/common/dto/email.dto";
import { Otp } from "src/common/modules/otp/entities/otp.entity";

export class CreateUserDto extends EmailDto {
    password: string;
    role: string;
    createdBy: string;
    otp?: Otp;
    // doctorInfo?: DoctorInfo;
    // organization?: Organization;
}