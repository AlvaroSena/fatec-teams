import type { Lesson } from "../../enterprise/entities/Lesson";

export interface LessonsRepository {
  findById(id: string): Promise<Lesson | null>;
  save(lesson: Lesson): Promise<Lesson>;
}
