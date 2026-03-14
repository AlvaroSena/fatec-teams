import { Router } from "express";
import { studentsRouter } from "../routes/students.routes";

export const routes = Router();

routes.use("/students", studentsRouter);
