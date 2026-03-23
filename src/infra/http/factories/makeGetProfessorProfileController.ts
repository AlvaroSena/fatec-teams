import type { Controller } from "../../../core/infra/Controller";
import { GetProfessorProfileUseCase } from "../../../domain/application/use-cases/GetProfessorProfileUseCase";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";
import { GetProfessorProfileController } from "../controllers/GetProfessorProfileController";

export function makeGetProfessorProfileController(): Controller {
  const professorsRepository = new DrizzleProfessorsRepository();
  const getProfessorProfileUseCase = new GetProfessorProfileUseCase(
    professorsRepository,
  );
  const getProfessorProfileController = new GetProfessorProfileController(
    getProfessorProfileUseCase,
  );

  return getProfessorProfileController;
}
