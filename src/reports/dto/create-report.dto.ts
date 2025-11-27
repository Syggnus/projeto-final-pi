import { ApiProperty } from '@nestjs/swagger';
import { ReportCategory, SeverityLevel, ReportStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class AffectedSystemDto {
  @ApiProperty()
  @IsString()
  name: string;
}

class AttachmentDto {
  @ApiProperty()
  @IsString()
  filePath: string;
}

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ReportCategory })
  @IsEnum(ReportCategory)
  category: ReportCategory;

  @ApiProperty({ enum: SeverityLevel, default: SeverityLevel.MEDIUM })
  @IsEnum(SeverityLevel)
  @IsOptional()
  severity?: SeverityLevel;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reporterName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  reporterEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reporterPhone?: string;

  @ApiProperty()
  @IsNumber()
  companyId: number;

  @ApiProperty({ type: [AffectedSystemDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => AffectedSystemDto)
  @IsOptional()
  affectedSystems?: AffectedSystemDto[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  incidentDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  evidenceDescription?: string;

  @ApiProperty({ type: [AttachmentDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsOptional()
  attachments?: AttachmentDto[];

  @ApiProperty({ enum: ReportStatus, required: false })
  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  assignedTo?: string;
}


