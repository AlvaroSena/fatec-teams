import { type Either, left, right } from "../../../core/logic/Either";
import { ProfessorNotFoundError } from "../errors/ProfessorNotFoundError";
import type { ProfessorsRepository } from "../repositories/ProfessorsRepository";

type GetProfessorProfileUseCaseRequest = {
  professorId: string;
};

type ProfessorResponse = {
  name: string;
  avatarUrl?: string;
  email: string;
  academicTitle?: string;
};

type GetProfessorProfileUseCaseResponse = Either<
  ProfessorNotFoundError,
  ProfessorResponse
>;

export class GetProfessorProfileUseCase {
  constructor(private professorsRepository: ProfessorsRepository) {}

  async execute({
    professorId,
  }: GetProfessorProfileUseCaseRequest): Promise<GetProfessorProfileUseCaseResponse> {
    const professor = await this.professorsRepository.findById(professorId);

    if (!professor) {
      return left(new ProfessorNotFoundError());
    }

    const { name, avatarUrl, email, academicTitle } = professor;

    return right({
      name,
      avatarUrl,
      email,
      academicTitle,
    });
  }
}
