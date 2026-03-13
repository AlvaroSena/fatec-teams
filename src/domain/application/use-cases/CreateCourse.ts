import { Course } from "../../enterprise/entities/Course";
import { Slug } from "../../enterprise/entities/values-objects/Slug";
import type { CoursesRepository } from "../repositories/CoursesRepository";
import type { ProfessorsRepository } from "../repositories/ProfessorsRepository";

type CreateCourseUseCaseRequest = {
  name: string;
  code: string;
  professorId: string;
};

export class CreateCourseUseCase {
  constructor(
    private coursesRepository: CoursesRepository,
    private professorsReposaitory: ProfessorsRepository,
  ) {}

  async execute({ name, code, professorId }: CreateCourseUseCaseRequest) {
    const professor = await this.professorsReposaitory.findById(professorId);

    if (!professor) {
      throw new Error();
    }

    const newCourse = Course.craete({
      name,
      code,
      slug: Slug.createFromText(name),
      professorId: professor.id,
    });

    await this.coursesRepository.save(newCourse);
  }
}
