import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeAuthenticateProfessorController } from "../factories/makeAuthenticateProfessorController";
import { makeGetProfessorProfileController } from "../factories/makeGetProfessorProfileController";
import { makeRegisterProfessorController } from "../factories/makeRegisterProfessorController";
import { ensureProfessorIsAuthenticated } from "../middlewares/ensureProfessorIsAuthenticated";

const professorsRouter = Router();

professorsRouter.post("/", adaptRoute(makeRegisterProfessorController()));
professorsRouter.post(
  "/sessions",
  adaptRoute(makeAuthenticateProfessorController()),
);
professorsRouter.post(
  "/me",
  ensureProfessorIsAuthenticated,
  adaptRoute(makeGetProfessorProfileController()),
);

export { professorsRouter };
