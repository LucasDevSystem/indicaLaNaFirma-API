import express from "express";
import { routes } from "./routes";
const cors = require("cors");

const PORT = 1388;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
