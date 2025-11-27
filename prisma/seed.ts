import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando Seed...");

  // Criar 1 empresa
  const company = await prisma.company.create({
    data: {
      name: "ACME Corp",
      branch: "Segurança da Informação",
      country: "Brasil",
      alertMessage: "Canal de denúncias disponível 24/7",
    },
  });

  console.log("Empresa criada:", company);

  // Criar 1 denúncia
  const report = await prisma.report.create({
    data: {
      title: "Possível vazamento de credenciais",
      description: "Credenciais admin foram expostas no repositório interno.",
      category: "DATA_LEAK",
      severity: "HIGH",
      companyId: company.id,

      affectedSystems: {
        create: [
          { name: "Auth Service" },
          { name: "Painel Administrativo" }
        ]
      },

      attachments: {
        create: [
          { filePath: "evidencias/print1.png" }
        ]
      }
    },
  });

  console.log("Denúncia criada:", report);
}

main()
  .then(() => {
    console.log("🌱 Seed finalizado!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
