import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeCreateStudentEnrollmentController } from "../factories/makeCreateStudentEnrollmentController";
import { ensureProfessorIsAuthenticated } from "../middlewares/ensureProfessorIsAuthenticated";

const enrollmentsRouter = Router();

enrollmentsRouter.post(
  "/",
  ensureProfessorIsAuthenticated,
  adaptRoute(makeCreateStudentEnrollmentController()),
);

export { enrollmentsRouter };
