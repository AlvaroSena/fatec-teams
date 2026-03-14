import type { StudentsRepository } from "../../../domain/application/repositories/StudentsRepository";
import type { Student } from "../../../domain/enterprise/entities/Student";

export class DrizzleStudensRepository implements StudentsRepository {
  findById(id: string): Promise<Student | null> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<Student | null> {
    throw new Error("Method not implemented.");
  }

  save(student: Student): Promise<Student> {
    throw new Error("Method not implemented.");
  }
}
