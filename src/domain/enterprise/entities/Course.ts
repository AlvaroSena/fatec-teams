import { Entity } from "../../../core/entities/Entity";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { Slug } from "./values-objects/Slug";

type CourseProps = {
  name: string;
  code: string;
  slug: Slug;
  professorId: UniqueEntityId;
};

export class Course extends Entity<CourseProps> {
  get name() {
    return this.props.name;
  }

  get code() {
    return this.props.code;
  }

  get slug() {
    return this.props.slug;
  }

  get professorId() {
    return this.props.professorId;
  }

  static create(props: CourseProps, id?: UniqueEntityId) {
    const course = new Course(props, id);

    return course;
  }
}
