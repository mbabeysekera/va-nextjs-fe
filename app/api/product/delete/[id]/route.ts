import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _: NextRequest,
  ctx: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  const { id } = await ctx.params;
  const deleteProductAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/moderator/products/delete/${id}`;
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(deleteProductAPI, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-App-Id": process.env.APP_ID || "",
    },
    cache: "no-store",
  });

  return NextResponse.json({ status: res.status });
};
