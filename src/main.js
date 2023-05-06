import cluster from "node:cluster";
import { cpus } from "node:os";
import http from "node:http";
import process from "node:process";
import { Server as WebSocketServer } from "socket.io";
import config from "./config/config.js";
import { logError, logInfo } from "./loggers/index.js";
import app from "./server.js";
import sockets from "./sockets.js";

const PORT = config.PORT;
const MODE = config.MODE;

const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const enableExpress = () => {
  server.listen(PORT, () => {
    logInfo(`🚀 Server ${process.pid} running on http://localhost:${PORT}...`);
    sockets(io);
  });
  server.on("error", (error) => logError(`Error en servidor ${error}`));
};

const enableCluster = () => {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    logInfo(`Master ${process.pid} is running.`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      logInfo(`${worker.process.pid} is finished.`);
      cluster.fork();
    });
  } else {
    enableExpress();
  }
};

const CLUSTER = MODE === "CLUSTER";

if (CLUSTER) {
  enableCluster();
} else {
  enableExpress();
}
