import { hash } from "bcryptjs";
import { type Either, left, right } from "../../../core/logic/Either";
import { Student } from "../../enterprise/entities/Student";
import { StudentAlreadyExistsError } from "../errors/StudentAlreadyExistsError";
import type { StudentsRepository } from "../repositories/StudentsRepository";

type RegisterStudentUseCaseRequest = {
  name: string;
  email: string;
  RA: string;
};

type RegisterStudentUseCaseResponse = Either<StudentAlreadyExistsError, null>;

export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    name,
    email,
    RA,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
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
