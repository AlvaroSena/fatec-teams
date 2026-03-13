import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type LessonProps = {
  courseId: UniqueEntityId;
  title: string;
  description: string;
  dueDate: Date;
};

export class Lesson extends Entity<LessonProps> {
  static craete(props: LessonProps, id?: UniqueEntityId) {
    const lesson = new Lesson(props, id);

    return lesson;
  }
}
