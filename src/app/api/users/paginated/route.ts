import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

const RETURN_NUM = 5;
export async function GET(req: NextRequest) {
  const hasCookie = req.cookies.has("accessToken");
  if (!hasCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const params = new URL(req.url).searchParams;
  console.log(Number(params.get("page")));

  const limit = Number(params.get("limit")) ?? RETURN_NUM;
  const pageNum: number = Number(params.get("page")) || 1;
  const users = await User.find({});
  const userCount = users.length;
  const hasMore = (pageNum - 1) * limit + limit <= userCount;

  const collection = users.splice((pageNum - 1) * limit, limit);

  return NextResponse.json(
    {
      payload: {
        pageNum,
        userCount,
        hasMore,
        collection,
      },
    },
    { status: 200 }
  );
}
