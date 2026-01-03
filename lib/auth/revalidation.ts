"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleLoginSync(path: string, type: "layout" | "page") {
  revalidatePath(path, type);
  redirect(path);
}
