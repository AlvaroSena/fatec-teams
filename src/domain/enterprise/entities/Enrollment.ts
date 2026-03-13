import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type EnrollmentProps = {
  courseId: UniqueEntityId;
  studentId: UniqueEntityId;
};

export class Enrollment extends Entity<EnrollmentProps> {
  static craete(props: EnrollmentProps, id?: UniqueEntityId) {
    const enrollment = new Enrollment(props, id);

    return enrollment;
  }
}
