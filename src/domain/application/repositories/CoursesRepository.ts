import type { Course } from "../../enterprise/entities/Course";

export interface CoursesRepository {
  findById(id: string): Promise<Course | null>;
  save(course: Course): Promise<Course>;
}
