import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type SubmissionProps = {
  lessionId: UniqueEntityId;
  studentId: UniqueEntityId;
  submittedAt: Date;
  correctedAt?: Date;
  grade?: number;
  feedback?: string;
};

export class Submission extends Entity<SubmissionProps> {
  get lessionId() {
    return this.props.lessionId;
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

  get grade() {
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
