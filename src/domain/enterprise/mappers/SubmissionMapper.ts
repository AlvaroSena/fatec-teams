/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { submissions } from "../../../infra/drizzle/schema";
import { Submission } from "../entities/Submission";

type PersistenceSubmission = InferSelectModel<typeof submissions>;

export class SubmissionMapper {
  static toDomain(raw: PersistenceSubmission): Submission {
    return Submission.create(
      {
        lessonId: new UniqueEntityId(raw.lessonId),
        studentId: new UniqueEntityId(raw.studentId),
        submittedAt: raw.submittedAt ?? new Date(),
        correctedAt: raw.correctedAt ?? undefined,
        grade: raw.grade ? Number(raw.grade) : undefined,
        feedback: raw.feedback ?? undefined,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(submission: Submission): PersistenceSubmission {
    return {
      id: submission.id.toString(),
      lessonId: submission.lessionId.toString(),
      studentId: submission.studentId.toString(),
      submittedAt: submission.submittedAt,
      correctedAt: submission.correctedAt ?? null,
      grade: submission.grade?.toString() ?? null,
      feedback: submission.feedback ?? null,
      createdAt: new Date(),
    };
  }
}
