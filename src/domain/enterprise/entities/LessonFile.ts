import { Entity } from "../../../core/entities/Entity";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";

type LessonFileProps = {
  lessonId: UniqueEntityId;
  url: string;
  filename: string;
  size: string;
  uploadedBy: UniqueEntityId;
};

export class LessonFile extends Entity<LessonFileProps> {
  static create(props: LessonFileProps, id?: UniqueEntityId) {
    const lessonfile = new LessonFile(props, id);

    return lessonfile;
  }
}
