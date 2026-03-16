import type { Controller } from "../../../core/infra/Controller";
import { SubmitLessonUseCase } from "../../../domain/application/use-cases/SubmitLessonUseCase";
import { DrizzleLessonsRepository } from "../../drizzle/repositories/DrizzleLessonsRepository";
import { DrizzleStudentsRepository } from "../../drizzle/repositories/DrizzleStudentsRepository";
import { DrizzleSubmissionsRepository } from "../../drizzle/repositories/DrizzleSubmissionsRepository";
import { SubmitLessonController } from "../controllers/SubmitLessonController";

export function makeSubmitLessonController(): Controller {
  const submissionsRepository = new DrizzleSubmissionsRepository();
  const studentsRepository = new DrizzleStudentsRepository();
  const lessonsRepository = new DrizzleLessonsRepository();
  const submitLessonUseCase = new SubmitLessonUseCase(
    submissionsRepository,
    studentsRepository,
    lessonsRepository,
  );
  const submitLessonController = new SubmitLessonController(
    submitLessonUseCase,
  );

  return submitLessonController;
}
