import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  unauthorized,
} from "../../../core/infra/HttpResponse";
import type { AuthenticateProfessorUseCase } from "../../../domain/application/use-cases/AuthenticateProfessorUseCase";

type AuthenticateProfessorControllerRequest = {
  email: string;
  password: string;
};

export class AuthenticateProfessorController implements Controller {
  constructor(
    private authenticateProfessorUseCase: AuthenticateProfessorUseCase,
  ) {}

  async handle({
    email,
    password,
  }: AuthenticateProfessorControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateProfessorUseCase.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        return unauthorized(error.message);
      }

      const { token } = result.value;

      return created({ token });
    } catch (err) {
      if (err instanceof Error) {
        return fail(err);
      }

      // If 'err' is not an Error, wrap it
      return fail(new Error(String(err)));
    }
  }
}
