import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeCorrectSubmissionController } from "../factories/makeCorrectSubmissionController";
import { makeSubmitLessonController } from "../factories/makeSubmitLessonController";

const submissionsRouter = Router();

submissionsRouter.post("/", adaptRoute(makeSubmitLessonController()));

submissionsRouter.patch(
  "/:id/correct",
  adaptRoute(makeCorrectSubmissionController()),
);

export { submissionsRouter };
