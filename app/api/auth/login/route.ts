import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { mobileNo, password } = await req.json();

  const loginAPI = `${process.env.BACKEND_URL}${process.env.API_BASE_URL}/login`;

  const res = await fetch(loginAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile_no: mobileNo, password: password }),
  });

  if (!res.ok) {
    const errResponse: StdErrorResponse = await res.json();
    return NextResponse.json(
      { message: errResponse.message || "Invalid credentials" },
      { status: 401 }
    );
  }

  const loginResponse: LoginResponse = await res.json();
  const accessToken = loginResponse.access_token;
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
};
