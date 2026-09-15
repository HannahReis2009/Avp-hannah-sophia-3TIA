// Estas dependências serão usadas quando os TODOs forem completados em aula.
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  // Middleware é uma função que fica no meio do caminho entre a requisição
  // e a resposta. O Express executa esta função antes da rota protegida.
  //
  // Aqui vamos verificar se o usuário está logado.
  // Se estiver logado, chamamos next() e deixamos a rota continuar.
  // Se não estiver, enviamos uma resposta e bloqueamos o acesso.
  //
  // O middleware funciona como um porteiro: ele pode deixar a requisição
  // continuar, bloquear, modificar ou adicionar informações nela.
  // Se ele não chamar next(), a função final da rota não será executada.

  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não informado" });
  }

  try {
    const token = authorization.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
