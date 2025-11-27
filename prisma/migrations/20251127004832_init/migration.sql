-- CreateTable
CREATE TABLE "companies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "alertMessage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "reporterName" TEXT,
    "reporterEmail" TEXT,
    "reporterPhone" TEXT,
    "companyId" INTEGER NOT NULL,
    "incidentDate" DATETIME,
    "evidenceDescription" TEXT,
    "internalNotes" TEXT,
    "assignedTo" TEXT,
    "resolvedAt" DATETIME,
    "resolution" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "reports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "report_affected_systems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "report_affected_systems_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "report_attachments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filePath" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "report_attachments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "reports_companyId_idx" ON "reports"("companyId");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_category_idx" ON "reports"("category");

-- CreateIndex
CREATE INDEX "reports_createdAt_idx" ON "reports"("createdAt");
