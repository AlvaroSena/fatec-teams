import type { Student } from "../../enterprise/entities/Student";

export interface StudentsRepository {
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  save(student: Student): Promise<Student>;
}
