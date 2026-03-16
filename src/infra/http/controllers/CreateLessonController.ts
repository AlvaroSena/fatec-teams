import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  notFound,
} from "../../../core/infra/HttpResponse";
import type { CreateLessonUseCase } from "../../../domain/application/use-cases/CreateLesson";

type CreateLessonControllerRequest = {
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
};

export class CreateLessonController implements Controller {
  constructor(private createLessonUseCase: CreateLessonUseCase) {}

  async handle({
    courseId,
    title,
    description,
    dueDate,
  }: CreateLessonControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createLessonUseCase.execute({
        courseId,
        title,
        description,
        dueDate: new Date(dueDate),
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
