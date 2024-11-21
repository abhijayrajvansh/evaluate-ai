import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface CloneRequestBody {
  repoUrl: string;
  targetDir?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CloneRequestBody = await request.json();
    const { repoUrl, targetDir } = body;

    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "repoUrl" parameter.' }, 
        { status: 400 }
      );
    }

    // Sanitize and resolve target directory
    const targetDirectory = targetDir
      ? path.resolve(process.cwd(), targetDir)
      : path.resolve(process.cwd(), 'agent-canvas');

    // Ensure the target directory exists
    await fs.mkdir(targetDirectory, { recursive: true });

    // Execute git clone with better error handling
    try {
      const { stdout, stderr } = await execAsync(`git clone ${repoUrl} ${targetDirectory}`);

      if (stderr) {
        console.warn('Clone process warning:', stderr);
      }

      return NextResponse.json(
        { 
          message: 'Repository cloned successfully.', 
          directory: targetDirectory,
          output: stdout.trim()
        }, 
        { status: 200 }
      );
    } catch (cloneError: any) {
      console.error('Repository clone failed:', cloneError);
      
      return NextResponse.json(
        { 
          error: 'Failed to clone repository.', 
          details: cloneError.message 
        }, 
        { status: 500 }
      );
    }

  } catch (err) {
    console.error('Unexpected error:', err);
    
    return NextResponse.json(
      { error: 'Invalid request body or unexpected error.' }, 
      { status: 400 }
    );
  }
}