import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";

export async function ensureProfessorIsAuthenticated(
  request: Request,
  reply: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return reply.status(401).json({ message: "Token is missing!" });
  }

  try {
    const payload = verify(token, "my-secret") as { sub: string };
    const professorsRepository = new DrizzleProfessorsRepository();

    const professor = await professorsRepository.findById(payload.sub);

    if (!professor) {
      return reply.status(401).json({ message: "Usuário não encontrado." });
    }

    request.user = payload;
    next();
  } catch (error) {
    return reply.status(500).json({ error });
  }
}
