import type { UseCaseError } from "../../../core/errors/UseCaseError";

export class InvalidEmailDomainError extends Error implements UseCaseError {
  constructor() {
    super(
      "Você precisa ter um email do Centro Paula Souza ou da Fatec para prosseguir com o cadastro.",
    );
    this.name = "InvalidDomainError";
  }
}
