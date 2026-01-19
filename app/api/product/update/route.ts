import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  const productPatch: ProductUpdateDetails = await req.json();

  const productUpdate = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/moderator/product/update`;
  const token = (await cookies()).get("access_token")?.value;
  const res = await fetch(productUpdate, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-App-Id": process.env.APP_ID || "",
    },
    body: JSON.stringify(productPatch),
  });

  if (!res.ok) {
    const errResponse: StdErrorResponse = await res.json();
    return NextResponse.json(
      { message: errResponse.message || "Product update failed" },
      { status: res.status }
    );
  }

  const productUpdateResponse: StdSuccessResponse = await res.json();

  const response = NextResponse.json(productUpdateResponse, {
    status: res.status,
  });

  return response;
};
