import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class LessonWasNotSubmittedError extends Error implements UseCaseError {
  constructor() {
    super("A atividade não foi enviada pelo aluno.");
    this.name = "LessonWasNotSubmittedError";
  }
}
