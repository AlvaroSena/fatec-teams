import type { Controller } from "../../../core/infra/Controller";
import { CreateStudentEnrollmentUseCase } from "../../../domain/application/use-cases/CreateStudentEnrollment";
import { DrizzleCoursesRepository } from "../../drizzle/repositories/DrizzleCoursesRepository";
import { DrizzleEnrollmentsRepository } from "../../drizzle/repositories/DrizzleEnrollmentsRepository";
import { DrizzleStudentsRepository } from "../../drizzle/repositories/DrizzleStudentsRepository";
import { CreateStudentEnrollmentController } from "../controllers/CreateStudentEnrollmentController";

export function makeCreateStudentEnrollmentController(): Controller {
  const enrollmentsRepository = new DrizzleEnrollmentsRepository();
  const coursesRepository = new DrizzleCoursesRepository();
  const studentsRepository = new DrizzleStudentsRepository();
  const createStudentEnrollmentUseCase = new CreateStudentEnrollmentUseCase(
    enrollmentsRepository,
    coursesRepository,
    studentsRepository,
  );
  const createStudentEnrollmentController =
    new CreateStudentEnrollmentController(createStudentEnrollmentUseCase);

  return createStudentEnrollmentController;
}
