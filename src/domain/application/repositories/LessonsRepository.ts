import type { Lesson } from "../../enterprise/entities/Lesson";

export interface LessonsRepository {
  save(lesson: Lesson): Promise<Lesson>;
}
