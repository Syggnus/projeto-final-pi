import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        severity: data.severity,
        status: 'PENDING',
        isAnonymous: data.isAnonymous ?? false,
        reporterName: data.reporterName,
        reporterEmail: data.reporterEmail,
        reporterPhone: data.reporterPhone,
        companyId: data.companyId,
        incidentDate: data.incidentDate ? new Date(data.incidentDate) : null,
        evidenceDescription: data.evidenceDescription,

        affectedSystems: {
          create: data.affectedSystems?.map(s => ({ name: s.name })) ?? [],
        },

        attachments: {
          create: data.attachments?.map(a => ({ filePath: a.filePath })) ?? [],
        },
      },

      include: {
        affectedSystems: true,
        attachments: true,
      },
    });
  }

  findAll() {
    return this.prisma.report.findMany({
      include: {
        affectedSystems: true,
        attachments: true,
        company: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        affectedSystems: true,
        attachments: true,
        company: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async update(id: number, data: UpdateReportDto) {
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.reportAffectedSystem.deleteMany({ where: { reportId: id } });
      await tx.reportAttachment.deleteMany({ where: { reportId: id } });

      return tx.report.update({
        where: { id },
        data: {
          ...data,
          incidentDate: data.incidentDate ? new Date(data.incidentDate) : undefined,

          affectedSystems: {
            create: data.affectedSystems?.map(s => ({ name: s.name })) ?? [],
          },

          attachments: {
            create: data.attachments?.map(a => ({ filePath: a.filePath })) ?? [],
          },
        },
        include: {
          affectedSystems: true,
          attachments: true,
        },
      });
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.report.delete({
      where: { id },
    });
  }
}
