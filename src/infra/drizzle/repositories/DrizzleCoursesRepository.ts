import { eq } from "drizzle-orm";
import type { CoursesRepository } from "../../../domain/application/repositories/CoursesRepository";
import type { Course } from "../../../domain/enterprise/entities/Course";
import { CourseMapper } from "../../../domain/enterprise/mappers/CourseMapper";
import { db } from "../";
import { courses } from "../schema";

export class DrizzleCoursesRepository implements CoursesRepository {
  async findById(id: string): Promise<Course | null> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));

    if (!course) {
      return null;
    }

    return CourseMapper.toDomain(course);
  }

  async save(course: Course): Promise<Course> {
    const [raw] = await db
      .insert(courses)
      .values({
        name: course.name,
        code: course.code,
        slug: course.slug.value,
        professorId: course.professorId.toString(),
      })
      .returning();

    return CourseMapper.toDomain(raw);
  }
}
