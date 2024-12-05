import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export const hashUserPassword = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

export const verifyUserPassword = (
  password: string,
  storedPassword: string
) => {
  return compareSync(password, storedPassword);
};
