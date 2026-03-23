import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  notFound,
} from "../../../core/infra/HttpResponse";
import type { GetProfessorProfileUseCase } from "../../../domain/application/use-cases/GetProfessorProfileUseCase";

type GetProfessorProfileControllerRequest = {
  userId: string;
};

export class GetProfessorProfileController implements Controller {
  constructor(private getProfessorProfileUseCase: GetProfessorProfileUseCase) {}

  async handle({
    userId: professorId,
  }: GetProfessorProfileControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getProfessorProfileUseCase.execute({
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
