import type { Controller } from "../../../core/infra/Controller";
import {
  fail,
  type HttpResponse,
  notFound,
  ok,
} from "../../../core/infra/HttpResponse";
import type { CorrectSubmissionUseCase } from "../../../domain/application/use-cases/CorrectSubmissionUseCase";

type CorrectSubmissionControllerRequest = {
  submissionId: string;
  grade: number;
  feedback?: string;
};

export class CorrectSubmissionController implements Controller {
  constructor(private correctSubmissionUseCase: CorrectSubmissionUseCase) {}

  async handle({
    submissionId,
    grade,
    feedback,
  }: CorrectSubmissionControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.correctSubmissionUseCase.execute({
        submissionId,
        grade,
        feedback,
      });

      if (result.isLeft()) {
        const error = result.value;

        return notFound(error.message);
      }

      return ok();
    } catch (err) {
      if (err instanceof Error) {
        return fail(err);
      }

      return fail(new Error(String(err)));
    }
  }
}
