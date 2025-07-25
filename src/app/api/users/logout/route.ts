import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("accessToken", "", { httpOnly: true });
    response.cookies.set("refreshToken", "", { httpOnly: true });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
