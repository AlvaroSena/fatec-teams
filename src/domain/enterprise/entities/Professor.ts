import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type ProfessorProps = {
  name: string;
  avatarUrl: string;
  email: string;
  password: string;
};

export class Professor extends Entity<ProfessorProps> {
  static create(props: ProfessorProps, id?: UniqueEntityId) {
    const professor = new Professor(props, id);

    return professor;
  }
}
