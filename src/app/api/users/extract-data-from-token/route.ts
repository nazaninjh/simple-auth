import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decodedId = await getDataFromToken(req);
    const user = await User.findOne({ _id: decodedId }).select("-password");

    return NextResponse.json(
      { payload: user, success: true, message: "user found!" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const isAuthError = error.message?.includes("Unauthorized");

    return NextResponse.json(
      { message: error.message },
      {
        status: isAuthError ? 401 : 500,
      }
    );
  }
}
