import type { Controller } from "../../../core/infra/Controller";
import {
  clientError,
  created,
  fail,
  type HttpResponse,
} from "../../../core/infra/HttpResponse";
import type { RegisterStudentUseCase } from "../../../domain/application/use-cases/RegisterStudentUseCase";

type RegisterStudentControllerRequest = {
  name: string;
  email: string;
  RA: string;
};

export class RegisterStudentController implements Controller {
  constructor(private registerStudentUseCase: RegisterStudentUseCase) {}

  async handle({
    name,
    email,
    RA,
  }: RegisterStudentControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.registerStudentUseCase.execute({
        name,
        email,
        RA,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error.message);
      }

      return created();
    } catch (err) {
      if (err instanceof Error) {
        return fail(err);
      }

      // If 'err' is not an Error, wrap it
      return fail(new Error(String(err)));
    }
  }
}
