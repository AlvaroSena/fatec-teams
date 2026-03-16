import type { Controller } from "../../../core/infra/Controller";
import { CreateLessonUseCase } from "../../../domain/application/use-cases/CreateLesson";
import { DrizzleCoursesRepository } from "../../drizzle/repositories/DrizzleCoursesRepository";
import { DrizzleLessonsRepository } from "../../drizzle/repositories/DrizzleLessonsRepository";
import { CreateLessonController } from "../controllers/CreateLessonController";

export function makeCreateLessonController(): Controller {
  const lessonsRepository = new DrizzleLessonsRepository();
  const coursesRepository = new DrizzleCoursesRepository();
  const createLessonUseCase = new CreateLessonUseCase(
    lessonsRepository,
    coursesRepository,
  );
  const createLessonController = new CreateLessonController(
    createLessonUseCase,
  );

  return createLessonController;
}
