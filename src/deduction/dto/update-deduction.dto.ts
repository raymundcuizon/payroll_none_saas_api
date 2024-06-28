import { PartialType } from '@nestjs/swagger';
import { CreateDeductionDto } from './create-deduction.dto';

export class UpdateDeductionDto extends PartialType(CreateDeductionDto) {}
