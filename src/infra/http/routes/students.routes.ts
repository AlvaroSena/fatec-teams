import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouteAdapter";
import { makeAuthenticateStudentController } from "../factories/makeAuthenticateStudentController";
import { makeRegisterStudentController } from "../factories/makeRegisterStudentController";

const studentsRouter = Router();

studentsRouter.post("/", adaptRoute(makeRegisterStudentController()));

studentsRouter.post(
  "/sessions",
  adaptRoute(makeAuthenticateStudentController()),
);

export { studentsRouter };
