import { type Either, left, right } from "../../../core/logic/Either";
import { Submission } from "../../enterprise/entities/Submission";
import { LessonWasNotSubmittedError } from "../errors/LessonWasNotSubmittedError";
import type { SubmissionsRepository } from "../repositories/SubmissionsRepository";

type CorrectSubmissionUseCaseRequest = {
  submissionId: string;
  grade: number;
  feedback?: string;
};

type CorrectSubmissionUseCaseResponse = Either<
  LessonWasNotSubmittedError,
  null
>;

export class CorrectSubmissionUseCase {
  constructor(private submissionsRepository: SubmissionsRepository) {}

  async execute({
    submissionId,
    grade,
    feedback,
  }: CorrectSubmissionUseCaseRequest): Promise<CorrectSubmissionUseCaseResponse> {
    const wasLessonSubmited =
      await this.submissionsRepository.findById(submissionId);

    if (!wasLessonSubmited) {
      return left(new LessonWasNotSubmittedError());
    }

    const correctedSubmission = Submission.create(
      {
        lessonId: wasLessonSubmited.id,
        studentId: wasLessonSubmited.studentId,
        submittedAt: wasLessonSubmited.submittedAt,
        correctedAt: new Date(),
        grade,
        feedback,
      },
      wasLessonSubmited.id,
    );

    await this.submissionsRepository.save(
      correctedSubmission,
      correctedSubmission.id,
    );

    return right(null);
  }
}
