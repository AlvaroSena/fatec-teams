import { eq } from "drizzle-orm";
import type { EnrollmentsRepository } from "../../../domain/application/repositories/EnrollmentsRepository";
import type { Enrollment } from "../../../domain/enterprise/entities/Enrollment";
import { EnrollmentMapper } from "../../../domain/enterprise/mappers/EnrollmentMapper";
import { db } from "../";
import { enrollments } from "../schema";

export class DrizzleEnrollmentsRepository implements EnrollmentsRepository {
  async findById(id: string): Promise<Enrollment | null> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, id));

    if (!enrollment) {
      return null;
    }

    return EnrollmentMapper.toDomain(enrollment);
  }

  async save(enrollment: Enrollment): Promise<Enrollment> {
    const [raw] = await db
      .insert(enrollments)
      .values({
        courseId: enrollment.courseId.toString(),
        studentId: enrollment.studentId.toString(),
      })
      .returning();

    return EnrollmentMapper.toDomain(raw);
  }
}
