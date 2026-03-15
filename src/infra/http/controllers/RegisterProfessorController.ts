import type { Controller } from "../../../core/infra/Controller";
import {
  clientError,
  created,
  fail,
  type HttpResponse,
} from "../../../core/infra/HttpResponse";
import type { RegisterProfessorUseCase } from "../../../domain/application/use-cases/RegisterProfessorUseCase";

type RegisterProfessorControllerRequest = {
  name: string;
  email: string;
  password: string;
  academicTitle?: string;
};

export class RegisterProfessorController implements Controller {
  constructor(private registerProfessorUseCase: RegisterProfessorUseCase) {}

  async handle({
    name,
    email,
    password,
    academicTitle,
  }: RegisterProfessorControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.registerProfessorUseCase.execute({
        name,
        email,
        password,
        academicTitle,
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
