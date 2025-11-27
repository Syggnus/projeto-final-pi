import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ReportsModule } from './reports/reports.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [ReportsModule, CompaniesModule],
  providers: [PrismaService],
})
export class AppModule {}
