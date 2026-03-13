import { type Either, left, right } from "../../../core/logic/Either";
import { Course } from "../../enterprise/entities/Course";
import { Slug } from "../../enterprise/entities/values-objects/Slug";
import { ProfessorNotFoundError } from "../errors/ProfessorNotFoundError";
import type { CoursesRepository } from "../repositories/CoursesRepository";
import type { ProfessorsRepository } from "../repositories/ProfessorsRepository";

type CreateCourseUseCaseRequest = {
  name: string;
  code: string;
  professorId: string;
};

type CreateCourseUseCaseResponse = Either<ProfessorNotFoundError, null>;

export class CreateCourseUseCase {
  constructor(
    private coursesRepository: CoursesRepository,
    private professorsReposaitory: ProfessorsRepository,
  ) {}

  async execute({
    name,
    code,
    professorId,
  }: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> {
    const professor = await this.professorsReposaitory.findById(professorId);

    if (!professor) {
      return left(new ProfessorNotFoundError());
    }

    const newCourse = Course.craete({
      name,
      code,
      slug: Slug.createFromText(name),
      professorId: professor.id,
    });

    await this.coursesRepository.save(newCourse);

    return right(null);
  }
}
