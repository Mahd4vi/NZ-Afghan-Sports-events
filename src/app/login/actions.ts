"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  // Validate at the boundary.
  if (!email || !password) {
    return { error: "Please enter both your email and password." };
  }
  if (!email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Generic message so we don't reveal whether the email exists.
  if (!user || !(await verifyPassword(password, user.password))) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
