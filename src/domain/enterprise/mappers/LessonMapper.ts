/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { lessons } from "../../../infra/drizzle/schema";
import { Lesson } from "../entities/Lesson";

type PersistenceLesson = InferSelectModel<typeof lessons>;

export class LessonMapper {
  static toDomain(raw: PersistenceLesson): Lesson {
    return Lesson.create(
      {
        courseId: new UniqueEntityId(raw.courseId),
        title: raw.title,
        description: raw.description,
        dueDate: raw.dueDate ? new Date(raw.dueDate) : new Date(),
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(lesson: Lesson): PersistenceLesson {
    return {
      id: lesson.id.toString(),
      courseId: lesson.courseId.toString(),
      title: lesson.title,
      description: lesson.description,
      dueDate:
        lesson.dueDate instanceof Date
          ? lesson.dueDate.toISOString().split("T")[0]
          : lesson.dueDate,
      createdAt: new Date(),
    };
  }
}
