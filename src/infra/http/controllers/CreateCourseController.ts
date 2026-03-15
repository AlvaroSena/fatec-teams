import type { Controller } from "../../../core/infra/Controller";
import { ok, type HttpResponse } from "../../../core/infra/HttpResponse";
import { CreateCourseUseCase } from "../../../domain/application/use-cases/CreateCourse";

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
    userId: professorId
  }: CreateCourseControllerRequest): Promise<HttpResponse> {
    console.log({
      name,
      code,
      professorId
    })

    return ok()
  }
}
