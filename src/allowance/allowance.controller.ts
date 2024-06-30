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
import { AllowanceService } from './allowance.service';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAllowanceDecorator } from './decorators';

@Controller('allowance')
@ApiTags('allowance')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post()
  @CreateAllowanceDecorator()
  create(@Body() createAllowanceDto: CreateAllowanceDto) {
    return this.allowanceService.create(createAllowanceDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

    return this.allowanceService.findAll({
      page,
      limit,
      route: '/',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allowanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAllowanceDto: UpdateAllowanceDto,
  ) {
    return this.allowanceService.update(+id, updateAllowanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allowanceService.remove(+id);
  }
}
