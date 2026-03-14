import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class ProfessorAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("Professor já está cadastrado.");
    this.name = "ProfessorAlreadyExistsError";
  }
}
