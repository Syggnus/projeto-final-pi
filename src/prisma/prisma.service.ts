import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({
      url: `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`
    });

    super({ adapter });
  }
}
