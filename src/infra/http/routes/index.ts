import { Router } from "express";
import { coursesRouter } from "./courses.routes";
import { enrollmentsRouter } from "./enrollments.routes";
import { lessonsRouter } from "./lessons.routes";
import { professorsRouter } from "./professors.routes";
import { studentsRouter } from "./students.routes";
import { submissionsRouter } from "./submissions.routes";

export const routes = Router();

routes.use("/courses", coursesRouter);
routes.use("/enrollments", enrollmentsRouter);
routes.use("/lessons", lessonsRouter);
routes.use("/professors", professorsRouter);
routes.use("/students", studentsRouter);
routes.use("/submissions", submissionsRouter);
