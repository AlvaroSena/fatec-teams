import { Entity } from "../../../core/entities/Entity";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";

type ProfessorProps = {
  name: string;
  avatarUrl?: string;
  email: string;
  password: string;
  academicTitle?: string;
};

export class Professor extends Entity<ProfessorProps> {
  static create(props: ProfessorProps, id?: UniqueEntityId) {
    const professor = new Professor(props, id);

    return professor;
  }
}
