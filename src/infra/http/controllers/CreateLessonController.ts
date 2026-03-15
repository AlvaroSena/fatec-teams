import type { Controller } from "../../../core/infra/Controller";
import type { HttpResponse } from "../../../core/infra/HttpResponse";

type CreateLessonControllerRequest = {
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
};

export class CreateLessonController implements Controller {
  async handle({
    courseId,
    title,
    description,
    dueDate,
  }: CreateLessonControllerRequest): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
}
