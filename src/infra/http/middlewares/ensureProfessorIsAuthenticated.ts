import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";

export async function ensureProfessorIsAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Token is missing!" });
  }

  try {
    const payload = verify(token, "my-secret") as { sub: string };
    const professorsRepository = new DrizzleProfessorsRepository();

    const professor = await professorsRepository.findById(payload.sub);

    if (!professor) {
      return response.status(401).json({ message: "Usuário não encontrado." });
    }

    request.user = payload;
    next();
  } catch (error) {
    return response.status(500).json({ error });
  }
}
