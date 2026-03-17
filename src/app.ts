import express from "express";
import swaggerUi from "swagger-ui-express";
import { routes } from "./infra/http/routes";
import { swaggerSetup } from "./infra/http/swagger";

const app = express();
app.use(express.json());

app.use("/v1", routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Documentation available at http://localhost:${port}/docs`);
});
