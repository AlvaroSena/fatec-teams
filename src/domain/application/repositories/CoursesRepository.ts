import type { Course } from "../../enterprise/entities/Course";

export interface CoursesRepository {
  save(course: Course): Promise<Course>;
}
