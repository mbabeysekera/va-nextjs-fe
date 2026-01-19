import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const product: ProductWithItems = await req.json();

  const productCreate = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/moderator/products/create`;
  const token = (await cookies()).get("access_token")?.value;
  const res = await fetch(productCreate, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-App-Id": process.env.APP_ID || "",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const errResponse: StdErrorResponse = await res.json();
    return NextResponse.json(
      { message: errResponse.message || "Product create failed" },
      { status: res.status }
    );
  }

  const producCreateResponse: StdSuccessResponse = await res.json();

  const response = NextResponse.json(producCreateResponse, { status: 201 });

  return response;
};
