import { CredentialsSignin } from "next-auth";

export class InvalidLoginError extends CredentialsSignin {
  message = "Se vale meter bien la clave o el correo gafo :3";
}

export class CouldNotParseError extends CredentialsSignin {
  message = "zod could not parse";
}

export class MemberNotFoundError extends CredentialsSignin {}

export class MemberNotActiveError extends CredentialsSignin {}

export class InvalidPasswordError extends CredentialsSignin {}
