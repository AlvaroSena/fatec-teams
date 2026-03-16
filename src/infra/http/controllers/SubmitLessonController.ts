import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  notFound,
} from "../../../core/infra/HttpResponse";
import type { SubmitLessonUseCase } from "../../../domain/application/use-cases/SubmitLessonUseCase";

type SubmitLessonControllerRequest = {
  lessonId: string;
  studentId: string;
};

export class SubmitLessonController implements Controller {
  constructor(private submitLessonUseCase: SubmitLessonUseCase) {}

  async handle({
    lessonId,
    studentId,
  }: SubmitLessonControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.submitLessonUseCase.execute({
        lessonId,
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
