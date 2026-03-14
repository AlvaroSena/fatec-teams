import { Entity } from "../../../core/entities/Entity";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";

type LessonProps = {
  courseId: UniqueEntityId;
  title: string;
  description: string;
  dueDate: Date;
};

export class Lesson extends Entity<LessonProps> {
  static create(props: LessonProps, id?: UniqueEntityId) {
    const lesson = new Lesson(props, id);

    return lesson;
  }
}
