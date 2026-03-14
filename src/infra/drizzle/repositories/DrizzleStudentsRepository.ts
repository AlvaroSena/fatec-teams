import { eq } from "drizzle-orm";
import type { StudentsRepository } from "../../../domain/application/repositories/StudentsRepository";
import type { Student } from "../../../domain/enterprise/entities/Student";
import { StudentMapper } from "../../../domain/enterprise/mappers/StudentMapper";
import { db } from "../";
import { students } from "../schema";

export class DrizzleStudentsRepository implements StudentsRepository {
  async findById(id: string): Promise<Student | null> {
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, id));

    if (!student) {
      return null;
    }

    return StudentMapper.toDomain(student);
  }

  async findByEmail(email: string): Promise<Student | null> {
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.email, email));

    if (!student) {
      return null;
    }

    return StudentMapper.toDomain(student);
  }

  async save(student: Student): Promise<Student> {
    const [raw] = await db
      .insert(students)
      .values({
        name: student.name,
        email: student.email,
        password: student.password,
        RA: student.RA,
      })
      .returning();

    return StudentMapper.toDomain(raw);
  }
}
