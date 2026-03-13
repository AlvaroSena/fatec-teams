import { Entity } from "../../../core/entitites/Entity";
import type { UniqueEntityId } from "../../../core/entitites/UniqueEntityId";

type SubmissionProps = {
  lessionId: UniqueEntityId;
  studentId: UniqueEntityId;
  submitted_at: Date;
  grade?: number;
  feedback?: string;
};

export class Submission extends Entity<SubmissionProps> {
  static craete(props: SubmissionProps, id?: UniqueEntityId) {
    const submission = new Submission(props, id);

    return submission;
  }
}
