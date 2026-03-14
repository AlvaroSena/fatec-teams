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
  get password() {
    return this.props.password;
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
