import type { Controller } from "../../../core/infra/Controller";
import {
  created,
  fail,
  type HttpResponse,
  unauthorized,
} from "../../../core/infra/HttpResponse";
import type { AuthenticateStudentUseCase } from "../../../domain/application/use-cases/AuthenticateStudentUseCase";

type AuthenticateStudentControllerRequest = {
  email: string;
  password: string;
};

export class AuthenticateStudentController implements Controller {
  constructor(private authenticateStudentUseCase: AuthenticateStudentUseCase) {}

  async handle({
    email,
    password,
  }: AuthenticateStudentControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateStudentUseCase.execute({
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
