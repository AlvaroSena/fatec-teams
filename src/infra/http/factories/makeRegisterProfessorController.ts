import type { Controller } from "../../../core/infra/Controller";
import { RegisterProfessorUseCase } from "../../../domain/application/use-cases/RegisterProfessorUseCase";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";
import { RegisterProfessorController } from "../controllers/RegisterProfessorController";

export function makeRegisterProfessorController(): Controller {
  const professorsRepository = new DrizzleProfessorsRepository();
  const registerProfessorUseCase = new RegisterProfessorUseCase(
    professorsRepository,
  );
  const registerProfessorController = new RegisterProfessorController(
    registerProfessorUseCase,
  );

  return registerProfessorController;
}
