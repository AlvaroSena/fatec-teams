import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";
import type { Slug } from "./values-objects/Slug";

type CourseProps = {
  name: string;
  code: string;
  slug: Slug;
  professorId: UniqueEntityId;
};

export class Course extends Entity<CourseProps> {
  static craete(props: CourseProps, id?: UniqueEntityId) {
    const course = new Course(props, id);

    return course;
  }
}
