import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCompanyDto) {
    return this.prisma.company.create({
      data,
    });
  }

  findAll() {
    return this.prisma.company.findMany({
      include: { reports: true },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { reports: true },
    });

    if (!company) throw new NotFoundException("Company not found");

    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    await this.findOne(id);
    return this.prisma.company.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id } });
  }
}
