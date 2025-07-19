import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
connect();
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
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
