import { PartialType } from '@nestjs/swagger';
import { CreateAllowanceDto } from './create-allowance.dto';

export class UpdateAllowanceDto extends PartialType(CreateAllowanceDto) {}
