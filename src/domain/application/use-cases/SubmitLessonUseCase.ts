import { type Either, left, right } from "../../../core/logic/Either";
import { Submission } from "../../enterprise/entities/Submission";
import { LessonNotFoundError } from "../errors/LessonNotFoundError";
import { StudentNotFoundError } from "../errors/StudentNotFoundError";
import type { LessonsRepository } from "../repositories/LessonsRepository";
import type { StudentsRepository } from "../repositories/StudentsRepository";
import type { SubmissionsRepository } from "../repositories/SubmissionsRepository";

type SubmitLessonUseCaseRequest = {
  lessonId: string;
  studentId: string;
};

type SubmitLessonUseCaseResponse = Either<StudentNotFoundError, null>;

export class SubmitLessonUseCase {
  constructor(
    private submissionsRepository: SubmissionsRepository,
    private studentsRepository: StudentsRepository,
    private lessonsRepository: LessonsRepository,
  ) {}

  async execute({
    studentId,
    lessonId,
  }: SubmitLessonUseCaseRequest): Promise<SubmitLessonUseCaseResponse> {
    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      return left(new StudentNotFoundError());
    }

    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson) {
      return left(new LessonNotFoundError());
    }

    const newSubmission = Submission.craete({
      studentId: student.id,
      lessionId: lesson.id,
      submittedAt: new Date(),
    });

    await this.submissionsRepository.save(newSubmission);

    return right(null);
  }
}
