import type { UniqueEntityId } from "../../../core/entities/UniqueEntityId";
import type { Submission } from "../../enterprise/entities/Submission";

export interface SubmissionsRepository {
  findById(id: string): Promise<Submission | null>;
  save(submission: Submission, id?: UniqueEntityId): Promise<Submission>;
}
