import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const currentTime = new Date().toISOString();

  return NextResponse.json({
    status: 200,
    message: "hello there, server is running",
    data: {
      uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds`,
      currentTime: currentTime,
      environment: process.env.NODE_ENV || "development",
      version: "MVP - v1.0.0",
      author: "Abhijay Rajvansh"
    }
  });
}
