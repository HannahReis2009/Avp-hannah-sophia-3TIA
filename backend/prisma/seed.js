import bcrypt from "bcrypt";

import prisma from "../src/prismaClient.js";

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Usuário comum
  await prisma.user.upsert({
    where: { email: "aluno@email.com" },
    update: {
      name: "Aluno Teste",
      password: hashedPassword,
      role: "USER",
    },
    create: {
      name: "Aluno Teste",
      email: "aluno@email.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  // Usuário administrador
  await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name: "Administrador",
      email: "admin@email.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Seed executado: usuários USER e ADMIN criados ou atualizados.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });