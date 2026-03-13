import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

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
