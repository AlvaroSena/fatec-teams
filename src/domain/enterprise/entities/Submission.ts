import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type SubmissionProps = {
  lessionId: UniqueEntityId;
  studentId: UniqueEntityId;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
};

export class Submission extends Entity<SubmissionProps> {
  static create(props: SubmissionProps, id?: UniqueEntityId) {
    const submission = new Submission(props, id);

    return submission;
  }
}
