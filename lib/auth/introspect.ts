"use server";

import { cookies } from "next/headers";
import { cache } from "react";

export interface IntrospectResponse {
  status: "SUCCESS" | "FAILURE";
  id: number;
  full_name: string;
  role: UserRole;
  time: Date;
}

const introspect = async (): Promise<IntrospectResponse | null> => {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) {
    return null;
  }
  const instrospectAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/moderator/introspect`;
  const res = await fetch(instrospectAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const responseToUI: IntrospectResponse = await res.json();
  if (responseToUI.status !== "SUCCESS") {
    return null;
  }

  return responseToUI;
};

export const introspectUser = cache(introspect);
