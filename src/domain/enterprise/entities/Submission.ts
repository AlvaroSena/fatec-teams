import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type SubmissionProps = {
  lessonId: UniqueEntityId;
  studentId: UniqueEntityId;
  submittedAt: Date;
  correctedAt?: Date;
  grade?: number;
  feedback?: string;
};

export class Submission extends Entity<SubmissionProps> {
  set grade(grade: number) {
    if (grade < 0 || grade > 10) {
      throw new Error("A nota não pode ser menor que zero ou maior que 10.");
    }

    this.props.grade = grade;
  }

  get lessionId() {
    return this.props.lessonId;
  }

  get studentId() {
    return this.props.studentId;
  }

  get submittedAt() {
    return this.props.submittedAt;
  }

  get correctedAt() {
    return this.props.correctedAt;
  }

  get grade(): number | undefined {
    return this.props.grade;
  }

  get feedback() {
    return this.props.feedback;
  }

  static create(props: SubmissionProps, id?: UniqueEntityId) {
    const submission = new Submission(props, id);

    return submission;
  }
}
