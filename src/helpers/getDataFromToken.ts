import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
