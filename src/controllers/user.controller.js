import UserService from "../services/user.service.js";
import { logError } from "../loggers/index.js";

class UserController {
  constructor() {}

  async getUserById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(404);
        res.send({ status: 404, description: "User not found" });
        logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        return;
      }
      res.status(200);
      res.json(user);
    } catch (err) {
      res.status(500);
      res.send({ status: 500, description: "Internal Server Error" });
      logError(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    }
  }
}

export default new UserController();
