import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateToken } from "@/helpers/generateToken";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const newAccessToken = generateToken({
      payload: {
        id: decoded.id,
        username: decoded.username,
        phone: decoded.phone,
        email: decoded.email,
      },
      secret: process.env.TOKEN_SECRET!,
      expireTime: "15m",
    });

    const response = NextResponse.json(
      { message: "Access token refreshed" },
      { status: 201 }
    );

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 15,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
