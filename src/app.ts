import express from "express";
import { routes } from "./infra/http/routes";

const app = express();
app.use(express.json());

app.use("/v1", routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
