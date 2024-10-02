import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import bcrypt from "bcrypt";
import { emailIsValid } from "$lib/validate";
import { getUserDocumentByEmail, insertUser, userExists, UserModel } from "./db";

import type { Cookies } from "@sveltejs/kit";

const oneDay = 60 * 60 * 24;
const accessTokenName = "token";

export const cookieOptions = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: oneDay
}

export const authenticate = (cookies: Cookies): App.Claims | undefined => {
  let token = cookies.get(accessTokenName);
  if (!token) return undefined;
  try {
    const claims = jwt.verify(token, JWT_SECRET);
    if (!claims) return undefined;
    return claims as App.Claims;
  } catch {
    return undefined;
  }
}

export const logout = (cookies: Cookies): void => {
  cookies.delete(accessTokenName, cookieOptions);
}

export const login = async (
  email: string,
  password: string
): Promise<{ error?: string, token?: string }> => {
  if (!email) return { error: "Email is required" };
  if (!password) return { error: "Password is required" };

  const error = "Invalid email or password";

  const user = await getUserDocumentByEmail(email);

  if (!user) {
    return { error };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return { error };
  }

  return { token: jwt.sign({ id: user._id.toHexString() }, JWT_SECRET) };
}

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ error?: string, token?: string }> => {
  const emailError = await checkForEmailError(email);

  if (emailError) {
    return { error: emailError };
  }

  const passwordError = checkForPasswordErrors(password);

  if (passwordError) {
    return { error: passwordError };
  }

  const nameError = checkForNameErrors(firstName, lastName);

  if (nameError) {
    return { error: nameError };
  }

  try {
    const user = await insertUser({ email, password, firstName, lastName });

    return { token: jwt.sign({ id: user._id.toHexString() }, JWT_SECRET) };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong. Please try again." };
  }
}

export const checkForEmailError = async (email: string): Promise<string | undefined> => {
  if (!email) {
    return "Email is required.";
  }

  if (!emailIsValid(email)) {
    return "Please enter a valid email.";
  }

  const exists = await userExists(email);

  if (exists) {
    return "There is already an account with this email.";
  }

  return undefined;
}

const checkForPasswordErrors = (password: string): string | undefined => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }

  return "";
}

const checkForNameErrors = (firstName: string, lastName: string): string => {
  if (!firstName) {
    return "Firstname is required.";
  }

  if (firstName.length <= 1) {
    return "Firstname has to be at least 2 characters.";
  }

  if (!lastName) {
    return "Lastname is required.";
  }

  if (lastName.length <= 1) {
    return "Lastname has to be at least 2 characters.";
  }

  return "";
}
