import type { Controller } from "../../../core/infra/Controller";
import { CorrectSubmissionUseCase } from "../../../domain/application/use-cases/CorrectSubmissionUseCase";
import { DrizzleSubmissionsRepository } from "../../drizzle/repositories/DrizzleSubmissionsRepository";
import { CorrectSubmissionController } from "../controllers/CorrectSubmissionController";

export function makeCorrectSubmissionController(): Controller {
  const submissionsRepository = new DrizzleSubmissionsRepository();
  const correctSubmissionUseCase = new CorrectSubmissionUseCase(
    submissionsRepository,
  );
  const correctSubmissionController = new CorrectSubmissionController(
    correctSubmissionUseCase,
  );

  return correctSubmissionController;
}
