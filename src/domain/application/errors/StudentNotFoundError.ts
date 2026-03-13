import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class StudentNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Aluno não encontrado.");
    this.name = "StudentNotFoundError";
  }
}
