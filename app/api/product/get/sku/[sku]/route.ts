import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  ctx: { params: Promise<{ sku: string }> }
): Promise<NextResponse> => {
  const { sku } = await ctx.params;
  const skuAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/sku/${sku}`;
  const res = await fetch(skuAPI, {
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
