const expres = require("express");
const routess = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const cors = require("cors");

const PORT = 1388;
const app = expres();

app.use(cors());
app.use(expres.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routess);

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));

module.exports = app;

