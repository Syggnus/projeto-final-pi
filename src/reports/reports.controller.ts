import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() dto: CreateReportDto) {
    return this.reportsService.create(dto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reportsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(Number(id));
  }
}
