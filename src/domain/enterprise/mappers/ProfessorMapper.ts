/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { professors } from "../../../infra/drizzle/schema";
import { Professor } from "../entities/Professor";

type PersistenceProfessor = InferSelectModel<typeof professors>;

export class ProfessorMapper {
  static toDomain(raw: PersistenceProfessor): Professor {
    return Professor.create(
      {
        name: raw.name,
        avatarUrl: raw.avatarUrl ?? undefined,
        email: raw.email,
        password: raw.password,
        academicTitle: raw.academicTitle ?? undefined,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(professor: Professor): PersistenceProfessor {
    return {
      id: professor.id.toString(),
      name: professor.name,
      avatarUrl: professor.avatarUrl ?? null,
      email: professor.email,
      password: professor.password,
      academicTitle: professor.academicTitle ?? null,
      createdAt: new Date(),
    };
  }
}
