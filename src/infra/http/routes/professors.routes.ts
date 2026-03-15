import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeRegisterProfessorController } from "../factories/makeRegisterProfessorController";

const professorsRouter = Router();

professorsRouter.post("/", adaptRoute(makeRegisterProfessorController()));

export { professorsRouter };
