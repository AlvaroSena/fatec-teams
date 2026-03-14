import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class InvalidEmailOrPasswordError extends Error implements UseCaseError {
  constructor() {
    super("Email ou senha incorreto.");
    this.name = "InvalidEmailOrPasswordError";
  }
}
