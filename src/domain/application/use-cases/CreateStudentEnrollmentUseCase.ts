import { type Either, left, right } from "../../../core/logic/Either";
import { Enrollment } from "../../enterprise/entities/Enrollment";
import { CourseNotFoundError } from "../errors/CourseNotFoundError";
import { StudentNotFoundError } from "../errors/StudentNotFoundError";
import type { CoursesRepository } from "../repositories/CoursesRepository";
import type { EnrollmentsRepository } from "../repositories/EnrollmentsRepository";
import type { StudentsRepository } from "../repositories/StudentsRepository";

type CreateStudentEnrollmentUseCaseRequest = {
  courseId: string;
  studentId: string;
};

type CreateStudentEnrollmentUseCaseResponse = Either<
  CourseNotFoundError | StudentNotFoundError,
  null
>;

export class CreateStudentEnrollmentUseCase {
  constructor(
    private enrollmentsRepository: EnrollmentsRepository,
    private coursesRepository: CoursesRepository,
    private studentsRepository: StudentsRepository,
  ) {}

  async execute({
    courseId,
    studentId,
  }: CreateStudentEnrollmentUseCaseRequest): Promise<CreateStudentEnrollmentUseCaseResponse> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      return left(new CourseNotFoundError());
    }

    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      return left(new StudentNotFoundError());
    }

    const newEnrollment = Enrollment.create({
      courseId: course.id,
      studentId: student.id,
    });

    await this.enrollmentsRepository.save(newEnrollment);

    return right(null);
  }
}
