import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class ProfessorNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Professor não encontrado.");
    this.name = "ProfessorNotFoundError";
  }
}
