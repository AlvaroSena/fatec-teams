import type { Controller } from "../../../core/infra/Controller";
import { CreateCourseUseCase } from "../../../domain/application/use-cases/CreateCourseUseCase";
import { DrizzleCoursesRepository } from "../../drizzle/repositories/DrizzleCoursesRepository";
import { DrizzleProfessorsRepository } from "../../drizzle/repositories/DrizzleProfessorsRepository";
import { CreateCourseController } from "../controllers/CreateCourseController";

export function makeCreateCourseController(): Controller {
  const coursesRepository = new DrizzleCoursesRepository();
  const professorsRepository = new DrizzleProfessorsRepository();
  const createCourseUseCase = new CreateCourseUseCase(
    coursesRepository,
    professorsRepository,
  );
  const createCourseController = new CreateCourseController(
    createCourseUseCase,
  );

  return createCourseController;
}
