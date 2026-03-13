import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class LessonNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Atividade não encontrada.");
    this.name = "LessonNotFoundError";
  }
}
