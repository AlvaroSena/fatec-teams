import { eq } from "drizzle-orm";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { SubmissionsRepository } from "../../../domain/application/repositories/SubmissionsRepository";
import type { Submission } from "../../../domain/enterprise/entities/Submission";
import { SubmissionMapper } from "../../../domain/enterprise/mappers/SubmissionMapper";
import { db } from "../";
import { submissions } from "../schema";

export class DrizzleSubmissionsRepository implements SubmissionsRepository {
  async findById(id: string): Promise<Submission | null> {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));

    if (!submission) {
      return null;
    }

    return SubmissionMapper.toDomain(submission);
  }

  async save(submission: Submission, id?: UniqueEntityId): Promise<Submission> {
    const [raw] = await db
      .insert(submissions)
      .values({
        id: id?.toString(),
        lessonId: submission.lessionId.toString(),
        studentId: submission.studentId.toString(),
        submittedAt: submission.submittedAt,
        correctedAt: submission.correctedAt ?? null,
        grade: submission.grade?.toString() ?? null,
        feedback: submission.feedback ?? null,
      })
      .returning();

    return SubmissionMapper.toDomain(raw);
  }
}
