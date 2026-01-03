import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  ctx: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  const { id } = await ctx.params;
  const getProductAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/products/${id}`;
  const res = await fetch(getProductAPI, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({} as ProductDetails, { status: res.status });
  }

  const productWithItems: ProductDetails = await res.json();
  const response = NextResponse.json(productWithItems, { status: 200 });
  return response;
};
