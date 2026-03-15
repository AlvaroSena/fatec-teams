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
  get name() {
    return this.props.name;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get academicTitle(): string | undefined {
    return this.props.academicTitle;
  }

  static create(props: ProfessorProps, id?: UniqueEntityId) {
    const professor = new Professor(props, id);

    return professor;
  }
}
