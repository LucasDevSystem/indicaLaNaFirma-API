import express from "express";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const cors = require("cors");

const PORT = 1388;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
