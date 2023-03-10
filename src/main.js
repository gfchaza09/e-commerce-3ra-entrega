import config from "./config.js";
import { logError, logInfo } from "./loggers/index.js";
import app from "./server.js";

const PORT = config.PORT;
const server = app.listen(PORT, () => {
  logInfo(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => logError(`Error en servidor ${error}`));
