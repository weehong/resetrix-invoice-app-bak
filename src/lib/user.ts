import { Role } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export async function createUser({
  name,
  email,
  password,
  role = "USER",
}: CreateUserParams) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Return the user without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  // Return the user without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  // Return the user without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
