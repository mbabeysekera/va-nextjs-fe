import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  ctx: { params: Promise<{ itemCode: string }> }
): Promise<NextResponse> => {
  const { itemCode } = await ctx.params;
  const itemCodeAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/item/${itemCode}`;
  const res = await fetch(itemCodeAPI, {
    method: "GET",
    cache: "no-store",
    headers: {
      "X-App-Id": process.env.APP_ID || "",
    },
  });

  if (!res.ok) {
    return NextResponse.json({} as ProductDetails, { status: res.status });
  }

  const productWithItems: ProductDetails = await res.json();
  const response = NextResponse.json(productWithItems, { status: 200 });
  return response;
};
