import type { Enrollment } from "../../enterprise/entities/Enrollment";

export interface EnrollmentsRepository {
  findById(id: string): Promise<Enrollment | null>;
  save(enrollment: Enrollment): Promise<Enrollment>;
}
