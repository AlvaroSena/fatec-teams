import type { Professor } from "../../enterprise/entities/Professor";

export interface ProfessorsRepository {
  findById(id: string): Promise<Professor | null>;
  findByEmail(email: string): Promise<Professor | null>;
  save(professor: Professor): Promise<Professor>;
}
