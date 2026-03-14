import { hash } from "bcryptjs";
import { type Either, left, right } from "../../../core/logic/Either";
import { Professor } from "../../enterprise/entities/Professor";
import { ProfessorAlreadyExistsError } from "../errors/ProfessorAlreadyExistsError";
import type { ProfessorsRepository } from "../repositories/ProfessorsRepository";

type RegisterProfessorUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  academicTitle?: string;
};

type RegisterProfessorUseCaseResponse = Either<
  ProfessorAlreadyExistsError,
  null
>;

export class RegisterProfessorUseCase {
  constructor(private professorsRepository: ProfessorsRepository) {}

  async execute({
    name,
    email,
    password,
    academicTitle,
  }: RegisterProfessorUseCaseRequest): Promise<RegisterProfessorUseCaseResponse> {
    const professorAlreadyExists =
      await this.professorsRepository.findByEmail(email);

    if (professorAlreadyExists) {
      return left(new ProfessorAlreadyExistsError());
    }

    const passwordHash = await hash(password, 8);

    const newProfessor = Professor.create({
      name,
      email,
      password: passwordHash,
      academicTitle,
    });

    await this.professorsRepository.save(newProfessor);

    return right(null);
  }
}
