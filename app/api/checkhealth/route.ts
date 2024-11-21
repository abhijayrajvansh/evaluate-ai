import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 200,
    server: 'running'
  })
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    status: 200,
    server: 'running'
  })
}
