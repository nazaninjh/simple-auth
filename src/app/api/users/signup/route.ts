import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { generateToken } from "@/helpers/server/generateToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { username, password, email, phone } = reqBody;

    // check duplication
    const userWithSamePhone = await User.findOne({ phone });
    if (userWithSamePhone) {
      return NextResponse.json(
        { error: "Phone number already in use" },
        { status: 400 },
      );
    }
    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail) {
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 400 },
      );
    }

    // check duplicate username
    const userWithSameUsername = await User.findOne({ username });
    if (userWithSameUsername) {
      return NextResponse.json(
        { error: "Username already taken!" },
        { status: 400 },
      );
    }

    // check admin
    if (username === "admin" || password === "admin") {
      return NextResponse.json(
        { error: "Admin can not be signed up!" },
        { status: 403 },
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // generate token
    const tokenPayload = {
      username: newUser.username,
      phone: newUser.phone,
      email: newUser.email,
    };
    const accessToken = generateToken({
      payload: tokenPayload,
      secret: process.env.TOKEN_SECRET!,
      expireTime: "15m",
    });

    const refreshToken = generateToken({
      payload: tokenPayload,
      secret: process.env.REFRESH_TOKEN_SECRET!,
      expireTime: "1d",
    });

    const response = NextResponse.json(
      { message: "Created user successfully", success: true, savedUser },
      { status: 201 },
    );

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
      maxAge: 60 * 60 * 24,
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
