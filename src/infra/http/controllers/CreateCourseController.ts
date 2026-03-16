import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  notFound,
} from "../../../core/infra/HttpResponse";
import type { CreateCourseUseCase } from "../../../domain/application/use-cases/CreateCourse";

type CreateCourseControllerRequest = {
  name: string;
  code: string;
  userId: string;
};

export class CreateCourseController implements Controller {
  constructor(private createCourseUseCase: CreateCourseUseCase) {}

  async handle({
    name,
    code,
    userId: professorId,
  }: CreateCourseControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createCourseUseCase.execute({
        name,
        code,
        professorId,
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
