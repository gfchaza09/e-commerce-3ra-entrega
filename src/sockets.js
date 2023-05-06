import messageService from "./services/message.service.js";
import { logInfo } from "./loggers/index.js";

// Objeto para controlar las conexiones de los usuarios
const userSockets = {};

export default (io) => {
  io.on("connection", (socket) => {
    const sessionId = socket.id;
    logInfo(`${sessionId} connected.`);

    if (userSockets[sessionId]) userSockets[sessionId].disconnect();

    userSockets[sessionId] = socket;

    socket.on("getMessages", async () => {
      io.emit("messages", await messageService.getAllMessages());
    });

    socket.on("message", async (data) => {
      await messageService.createMessage(data);
      io.emit("messageResponse", await messageService.getAllMessages());
    });

    socket.on("reply", async (data) => {
      await messageService.addReplyToMessageById(data.messageId, data);
      io.emit("messageResponse", await messageService.getAllMessages());
    });

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("disconnect", () => {
      logInfo("🔥: A user disconnected");
      delete userSockets[sessionId];
      socket.disconnect();
    });
  });
};
