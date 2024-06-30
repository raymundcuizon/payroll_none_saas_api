import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDeductionDecorator } from './decorators';

@Controller('deduction')
@ApiTags('deduction')
export class DeductionController {
  constructor(private readonly deductionService: DeductionService) {}

  @Post()
  @CreateDeductionDecorator()
  create(@Body() createDeductionDto: CreateDeductionDto) {
    return this.deductionService.create(createDeductionDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

    return this.deductionService.findAll({
      page,
      limit,
      route: '/',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deductionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeductionDto: UpdateDeductionDto,
  ) {
    return this.deductionService.update(+id, updateDeductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deductionService.remove(+id);
  }
}
