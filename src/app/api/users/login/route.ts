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
  const { username, password } = reqBody;

  try {
    const user = await User.findOne({ username });
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Username or Password" },
        { status: 400 }
      );
    }
    // generate token
    const tokenPayload = {
      id: user._id,
      username: user.username,
      phone: user.phone,
      email: user.email,
    };
    const token = generateToken({
      payload: tokenPayload,
      secret: process.env.TOKEN_SECRET!,
      expireTime: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      savedUser: {
        username: user.username,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
