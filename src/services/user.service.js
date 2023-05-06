import { usuariosDao } from "../daos/index.js";
import CartService from "../services/cart.service.js";
import { generateHashPassword } from "../utils/crypt.js";

class UserService {
  constructor() {}

  async getUserByEmail(email) {
    try {
      return await usuariosDao.getUserByEmail(email);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getUserById(userId) {
    try {
      return await usuariosDao.list(userId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addMessageToUserById(userId, message) {
    try {
      return await usuariosDao.addMessageToUserById(userId, message);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addReplyToMessageToUserById(message_id, newReply, user_id) {
    try {
      return await usuariosDao.addReplyToMessageToUserById(
        message_id,
        newReply,
        user_id
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(body) {
    try {
      const { email, password, nombre, edad, tel, direccion } = body;
      const hashedPassword = await generateHashPassword(password); // Encrypting the password
      const userCart = await CartService.createCart({
        email,
        products: [],
        deliveryAddress: direccion,
      });
      const newUser = {
        email,
        password: hashedPassword,
        nombre,
        edad,
        tel: `+549${tel}`,
        direccion,
        avatar:
          "https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg?w=2000",
        cartId: userCart._id,
        messages: [],
      };
      await usuariosDao.save(newUser);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateUserMessagesById(userId, messages) {
    try {
      return await usuariosDao.updateUserMessagesById(userId, messages);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteMessageFromUserById(userId, messageId) {
    try {
      return await usuariosDao.deleteMessageFromUserById(userId, messageId);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserService();
