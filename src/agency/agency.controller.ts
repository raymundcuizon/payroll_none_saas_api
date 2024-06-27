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
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateAgencyDecorator } from './decorators';
import { Authentication } from '@nestjs-cognito/auth';

@Controller('agency')
@ApiTags('agency')
// @Authentication()
// @ApiSecurity('accessToken')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  @CreateAgencyDecorator()
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agencyService.create(createAgencyDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

    return this.agencyService.findAll({
      page,
      limit,
      route: '/',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agencyService.update(+id, updateAgencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agencyService.remove(+id);
  }
}
