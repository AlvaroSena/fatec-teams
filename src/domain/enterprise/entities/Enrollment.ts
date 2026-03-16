import { Entity } from "../../../core/entities/Entity";
import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";

type EnrollmentProps = {
  courseId: UniqueEntityId;
  studentId: UniqueEntityId;
};

export class Enrollment extends Entity<EnrollmentProps> {
  get courseId() {
    return this.props.courseId;
  }

  get studentId() {
    return this.props.studentId;
  }

  static create(props: EnrollmentProps, id?: UniqueEntityId) {
    const enrollment = new Enrollment(props, id);

    return enrollment;
  }
}
