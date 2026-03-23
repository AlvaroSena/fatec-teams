import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  notFound,
} from "../../../core/infra/HttpResponse";
import type { CreateStudentEnrollmentUseCase } from "../../../domain/application/use-cases/CreateStudentEnrollmentUseCase";

type CreateStudentEnrollmentControllerRequest = {
  courseId: string;
  studentId: string;
};

export class CreateStudentEnrollmentController implements Controller {
  constructor(
    private createStudentEnrollmentUseCase: CreateStudentEnrollmentUseCase,
  ) {}

  async handle({
    courseId,
    studentId,
  }: CreateStudentEnrollmentControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createStudentEnrollmentUseCase.execute({
        courseId,
        studentId,
      });

      if (result.isLeft()) {
        const error = result.value;

        return notFound(error.message);
      }

      return created();
    } catch (err) {
      if (err instanceof Error) {
        return fail(err);
      }

      return fail(new Error(String(err)));
    }
  }
}
