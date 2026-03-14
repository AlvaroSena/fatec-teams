import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { type Either, left, right } from "../../../core/logic/Either";
import type { StudentsRepository } from "../../application/repositories/StudentsRepository";
import { InvalidEmailOrPasswordError } from "../errors/InvalidEmailOrPasswordError";

type TokenResponse = {
  token: string;
};

type AuthenticateStudentUseCaseRequest = {
  email: string;
  password: string;
};

type AuthenticateStudentUseCaseReponse = Either<
  InvalidEmailOrPasswordError,
  TokenResponse
>;

export class AuthenticateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseReponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      return left(new InvalidEmailOrPasswordError());
    }

    const passwordMatch = await compare(password, student.password);

    if (!passwordMatch) {
      return left(new InvalidEmailOrPasswordError());
    }

    const token = sign({ sub: student.id }, "my-secret", { expiresIn: "7d" });

    return right({ token });
  }
}
