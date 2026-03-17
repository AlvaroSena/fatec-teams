import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { type Either, left, right } from "../../../core/logic/Either";
import type { ProfessorsRepository } from "../../application/repositories/ProfessorsRepository";
import { InvalidEmailOrPasswordError } from "../errors/InvalidEmailOrPasswordError";

type TokenResponse = {
  token: string;
};

type AuthenticateProfessorUseCaseRequest = {
  email: string;
  password: string;
};

type AuthenticateProfessorUseCaseReponse = Either<
  InvalidEmailOrPasswordError,
  TokenResponse
>;

export class AuthenticateProfessorUseCase {
  constructor(private professorsRepository: ProfessorsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateProfessorUseCaseRequest): Promise<AuthenticateProfessorUseCaseReponse> {
    const professor = await this.professorsRepository.findByEmail(email);

    if (!professor) {
      return left(new InvalidEmailOrPasswordError());
    }

    const passwordMatch = await compare(password, professor.password);

    if (!passwordMatch) {
      return left(new InvalidEmailOrPasswordError());
    }

    const token = sign({ sub: professor.id.toString() }, "my-secret", {
      expiresIn: "7d",
    });

    return right({ token });
  }
}
