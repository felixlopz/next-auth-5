import { CredentialsSignin } from "next-auth";

export class InvalidLoginError extends CredentialsSignin {
  code = "Se vale meter bien la clave o el correo gafo :3";
}
