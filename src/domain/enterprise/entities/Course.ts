import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type CourseProps = {
  name: string;
  code: string;
  slug: string;
  professorId: UniqueEntityId;
};

export class Course extends Entity<CourseProps> {
  static craete(props: CourseProps, id?: UniqueEntityId) {
    const course = new Course(props, id);

    return course;
  }
}
