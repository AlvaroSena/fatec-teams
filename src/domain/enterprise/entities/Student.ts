import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type StudentProps = {
  name: string;
  avatarUrl?: string;
  email: string;
  RA: string;
  password: string;
};

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name;
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get RA() {
    return this.props.RA;
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
