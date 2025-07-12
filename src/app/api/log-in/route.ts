import { NextRequest, NextResponse } from "next/server";
import dbJson from "@/db/db.json";
import { IDataBase } from "@/types/db.type";
import bcrypt from "bcryptjs";

const db = dbJson as IDataBase;

export async function GET() {
  return NextResponse.json(db.results);
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  //   admin
  if (
    username.toLowerCase() === "admin" &&
    password.toLowerCase() === "admin"
  ) {
    const safeUser = {
      title: dbJson.results[0].name.title,
      firstName: dbJson.results[0].name.first,
      lastName: dbJson.results[0].name.last,
    };

    return NextResponse.json(safeUser);
  }

  const user = db.results.find((user) => user.login.username === username);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.login.password);
  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const safeUser = {
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
  };

  return NextResponse.json(safeUser);
}
