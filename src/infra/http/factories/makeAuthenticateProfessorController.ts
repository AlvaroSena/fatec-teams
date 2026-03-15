import type { Controller } from "../../../core/infra/Controller";
import { AuthenticateProfessorUseCase } from "../../../domain/application/use-cases/AuthenticateProfessorUseCase";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";
import { AuthenticateProfessorController } from "../controllers/AuthenticateProfessorController";

export function makeAuthenticateProfessorController(): Controller {
  const professorsRepository = new DrizzleProfessorsRepository();
  const authenticateProfessorUseCase = new AuthenticateProfessorUseCase(
    professorsRepository,
  );
  const authenticateProfessorController = new AuthenticateProfessorController(
    authenticateProfessorUseCase,
  );

  return authenticateProfessorController;
}
