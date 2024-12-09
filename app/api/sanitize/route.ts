import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stderr } = await execAsync("rm -rf analysis-board");
    if (stderr) {
      console.warn("sanitization process started:", stderr);
    }

    return NextResponse.json({ message: "sanitization complete" });
  } catch (err) {
    const error = err as Error;
    console.error("sanitization failed:", error.message);

    return NextResponse.json(
      { error: "failed to sanitize", details: error.message },
      { status: 500 }
    );
  }
}
