/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { students } from "../../../infra/drizzle/schema";
import { Student } from "../entities/Student";

type PersistenceStudent = InferSelectModel<typeof students>;

export class StudentMapper {
  static toDomain(raw: PersistenceStudent): Student {
    return Student.create(
      {
        name: raw.name,
        avatarUrl: raw.avatarUrl ?? undefined,
        email: raw.email,
        password: raw.password,
        RA: raw.RA,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(student: Student): PersistenceStudent {
    return {
      id: student.id.toString(),
      name: student.name,
      avatarUrl: student.avatarUrl ?? null,
      email: student.email,
      password: student.password,
      RA: student.RA,
      createdAt: new Date(),
    };
  }
}
