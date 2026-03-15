import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeAuthenticateProfessorController } from "../factories/makeAuthenticateProfessorController";
import { makeRegisterProfessorController } from "../factories/makeRegisterProfessorController";

const professorsRouter = Router();

professorsRouter.post("/", adaptRoute(makeRegisterProfessorController()));
professorsRouter.post(
  "/sessions",
  adaptRoute(makeAuthenticateProfessorController()),
);

export { professorsRouter };
