import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("Aluno já está cadastrado.");
    this.name = "StudentAlreadyExistsError";
  }
}
