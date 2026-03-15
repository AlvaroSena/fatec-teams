import { eq } from "drizzle-orm";
import type { ProfessorsRepository } from "../../../domain/application/repositories/ProfessorsRepository";
import type { Professor } from "../../../domain/enterprise/entities/Professor";
import { ProfessorMapper } from "../../../domain/enterprise/mappers/ProfessorMapper";
import { db } from "../";
import { professors } from "../schema";

export class DrizzleProfessorsRepository implements ProfessorsRepository {
  async findById(id: string): Promise<Professor | null> {
    const [professor] = await db
      .select()
      .from(professors)
      .where(eq(professors.id, id));

    if (!professor) {
      return null;
    }

    return ProfessorMapper.toDomain(professor);
  }

  async findByEmail(email: string): Promise<Professor | null> {
    const [professor] = await db
      .select()
      .from(professors)
      .where(eq(professors.email, email));

    if (!professor) {
      return null;
    }

    return ProfessorMapper.toDomain(professor);
  }

  async save(professor: Professor): Promise<Professor> {
    const [raw] = await db
      .insert(professors)
      .values({
        name: professor.name,
        avatarUrl: professor.avatarUrl,
        email: professor.email,
        password: professor.password,
        academicTitle: professor.academicTitle,
      })
      .returning();

    return ProfessorMapper.toDomain(raw);
  }
}
