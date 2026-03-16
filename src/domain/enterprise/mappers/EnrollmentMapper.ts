/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { enrollments } from "../../../infra/drizzle/schema";
import { Enrollment } from "../entities/Enrollment";

type PersistenceEnrollment = InferSelectModel<typeof enrollments>;

export class EnrollmentMapper {
  static toDomain(raw: PersistenceEnrollment): Enrollment {
    return Enrollment.create(
      {
        courseId: new UniqueEntityId(raw.courseId),
        studentId: new UniqueEntityId(raw.studentId),
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(enrollment: Enrollment): PersistenceEnrollment {
    return {
      id: enrollment.id.toString(),
      courseId: enrollment.courseId.toString(),
      studentId: enrollment.studentId.toString(),
      createdAt: new Date(),
    };
  }
}
