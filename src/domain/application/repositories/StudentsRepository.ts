import type { Student } from "../../enterprise/entities/Student";

export interface StudentsRepository {
  findById(id: string): Promise<Student | null>;
}
