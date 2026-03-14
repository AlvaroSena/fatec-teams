import type { Controller } from "../../../core/infra/Controller";
import { RegisterStudentUseCase } from "../../../domain/application/use-cases/RegisterStudentUseCase";
import { DrizzleStudentsRepository } from "../../drizzle/repositories/DrizzleStudentsRepository";
import { RegisterStudentController } from "../controllers/RegisterStudentController";

export function makeRegisterStudentController(): Controller {
  const studentsRepository = new DrizzleStudentsRepository();
  const registerStudentUseCase = new RegisterStudentUseCase(studentsRepository);
  const registerStudentController = new RegisterStudentController(
    registerStudentUseCase,
  );

  return registerStudentController;
}
