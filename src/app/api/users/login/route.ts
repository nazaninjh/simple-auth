import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import bcryptjs from "bcryptjs";

import { generateToken } from "@/helpers/generateToken";

connect();
export async function POST(req: NextRequest) {
  // login for admin later

  // checking for required fields happens automatically
  const reqBody = await req.json();
  const { username, password, rememberMe } = reqBody;

  try {
    const user = await User.findOne({ username });
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Username or Password" },
        { status: 400 },
      );
    }
    // generate token
    const tokenPayload = {
      id: user._id,
      username: user.username,
      phone: user.phone,
      email: user.email,
    };
    const accessToken = generateToken({
      payload: tokenPayload,
      secret: process.env.TOKEN_SECRET!,
      expireTime: "15m",
    });

    const refreshToken = generateToken({
      payload: tokenPayload,
      secret: process.env.REFRESH_TOKEN_SECRET!,
      expireTime: rememberMe ? "5d" : "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      status: 200,
      savedUser: {
        username: user.username,
      },
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: rememberMe ? 60 * 60 * 24 * 5 : 60 * 60 * 24,
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
