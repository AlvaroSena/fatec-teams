import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeCreateCourseController } from "../factories/makeCreateCourseController";
import { ensureProfessorIsAuthenticated } from "../middlewares/ensureProfessorIsAuthenticated";

const coursesRouter = Router();

coursesRouter.post(
  "/",
  ensureProfessorIsAuthenticated,
  adaptRoute(makeCreateCourseController()),
);

export { coursesRouter };
