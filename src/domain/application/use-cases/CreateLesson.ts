import { type Either, left, right } from "../../../core/logic/Either";
import { Lesson } from "../../enterprise/entities/Lesson";
import { ProfessorNotFoundError } from "../errors/ProfessorNotFoundError";
import type { CoursesRepository } from "../repositories/CoursesRepository";
import type { LessonsRepository } from "../repositories/LessonsRepository";

type CreateLessonUseCaseRequest = {
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
};

type CreateLessonUseCaseResponse = Either<ProfessorNotFoundError, null>;

export class CreateLessonUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async execute({
    courseId,
    title,
    description,
    dueDate,
  }: CreateLessonUseCaseRequest): Promise<CreateLessonUseCaseResponse> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      return left(new ProfessorNotFoundError());
    }

    const newLesson = Lesson.create({
      title,
      description,
      dueDate,
      courseId: course.id,
    });

    await this.lessonsRepository.save(newLesson);

    return right(null);
  }
}
