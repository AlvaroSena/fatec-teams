import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class CourseNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Curso não encontrado.");
    this.name = "CourseNotFoundError";
  }
}
