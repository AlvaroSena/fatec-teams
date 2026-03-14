import { hash } from "bcryptjs";
import { type Either, left, right } from "../../../core/logic/Either";
import { Student } from "../../enterprise/entities/Student";
import { InvalidEmailDomainError } from "../errors/InvalidEmailDomainError";
import { StudentAlreadyExistsError } from "../errors/StudentAlreadyExistsError";
import type { StudentsRepository } from "../repositories/StudentsRepository";

type RegisterStudentUseCaseRequest = {
  name: string;
  email: string;
  RA: string;
};

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError | InvalidEmailDomainError,
  null
>;

export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    name,
    email,
    RA,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const [, domain] = email.split("@");

    console.log(domain);

    if (domain !== "cps.sp.gov.br" && domain !== "fatec.sp.gov.br") {
      return left(new InvalidEmailDomainError());
    }

    const studentAlreadyExists =
      await this.studentsRepository.findByEmail(email);

    if (studentAlreadyExists) {
      return left(new StudentAlreadyExistsError());
    }

    const passwordHash = await hash(RA, 8);

    const newStudent = Student.create({
      name,
      email,
      RA,
      password: passwordHash,
    });

    await this.studentsRepository.save(newStudent);

    return right(null);
  }
}
