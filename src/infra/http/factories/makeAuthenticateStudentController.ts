import type { Controller } from "../../../core/infra/Controller";
import { AuthenticateStudentUseCase } from "../../../domain/application/use-cases/AuthenticateStudentUseCase";
import { DrizzleStudentsRepository } from "../../drizzle/repositories/DrizzleStudentsRepository";
import { AuthenticateStudentController } from "../controllers/AuthenticateStudentController";

export function makeAuthenticateStudentController(): Controller {
  const studentsRepository = new DrizzleStudentsRepository();
  const authenticateStudentUseCase = new AuthenticateStudentUseCase(
    studentsRepository,
  );
  const authenticateStudentController = new AuthenticateStudentController(
    authenticateStudentUseCase,
  );

  return authenticateStudentController;
}
