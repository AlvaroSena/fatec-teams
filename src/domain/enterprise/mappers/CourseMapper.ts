/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import type { InferSelectModel } from "drizzle-orm";
import { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { courses } from "../../../infra/drizzle/schema";
import { Course } from "../entities/Course";
import { Slug } from "../entities/values-objects/Slug";

type PersistenceCourse = InferSelectModel<typeof courses>;

export class CourseMapper {
  static toDomain(raw: PersistenceCourse): Course {
    return Course.create(
      {
        name: raw.name,
        code: raw.code,
        slug: Slug.create(raw.slug),
        professorId: new UniqueEntityId(raw.professorId),
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(course: Course): PersistenceCourse {
    return {
      id: course.id.toString(),
      professorId: course.professorId.toString(),
      name: course.name,
      code: course.code,
      slug: course.slug.value,
      createdAt: new Date(),
    };
  }
}
