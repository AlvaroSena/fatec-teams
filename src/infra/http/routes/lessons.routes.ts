import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeCreateLessonController } from "../factories/makeCreateLessonController";
import { ensureProfessorIsAuthenticated } from "../middlewares/ensureProfessorIsAuthenticated";

const lessonsRouter = Router();

lessonsRouter.post(
  "/",
  ensureProfessorIsAuthenticated,
  adaptRoute(makeCreateLessonController()),
);

export { lessonsRouter };
