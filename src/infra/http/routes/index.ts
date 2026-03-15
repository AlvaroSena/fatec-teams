import { Router } from "express";
import { studentsRouter } from "../routes/students.routes";
import { professorsRouter } from "./professors.routes";

export const routes = Router();

routes.use("/students", studentsRouter);
routes.use("/professors", professorsRouter);
