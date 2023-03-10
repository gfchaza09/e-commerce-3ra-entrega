import bcrypt from "bcrypt";

export const generateHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

export const verifyPass = async (usuario, password) => {
  const match = await bcrypt.compare(password, usuario.password);
  return match;
};
