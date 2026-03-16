import { eq } from "drizzle-orm";
import type { LessonsRepository } from "../../../domain/application/repositories/LessonsRepository";
import type { Lesson } from "../../../domain/enterprise/entities/Lesson";
import { LessonMapper } from "../../../domain/enterprise/mappers/LessonMapper";
import { db } from "../";
import { lessons } from "../schema";

export class DrizzleLessonsRepository implements LessonsRepository {
  async findById(id: string): Promise<Lesson | null> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));

    if (!lesson) {
      return null;
    }

    return LessonMapper.toDomain(lesson);
  }

  async save(lesson: Lesson): Promise<Lesson> {
    const [raw] = await db
      .insert(lessons)
      .values({
        courseId: lesson.courseId.toString(),
        title: lesson.title,
        description: lesson.description,
        dueDate:
          lesson.dueDate instanceof Date
            ? lesson.dueDate.toISOString().split("T")[0]
            : lesson.dueDate,
      })
      .returning();

    return LessonMapper.toDomain(raw);
  }
}
