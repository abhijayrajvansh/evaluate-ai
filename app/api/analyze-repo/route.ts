import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    let { repoName } = await request.json();
    if (!repoName) repoName = '';

    const analysisDir = path.resolve(process.cwd(), './analysis-board', repoName);
    
    // check if the repository exists or not
    try {
      await fs.access(analysisDir);
      console.log(`\nanalysis-board repository found!`)
    } catch (err) {
      return NextResponse.json(
        { error: `analysis-board repository not found :(` },
        { status: 404 }
      );
    }
    
    
    const analysisResults: Record<string, any> = {};
    
    // p1: analyze code quality and style consistency
    try {
      // analyzing directory contents
      console.log('\ndirectory contents:', await fs.readdir(analysisDir));

      // removing node_modules, pnpm-lock.yaml, and .next
      console.log(`\nremoving node_modules, pnpm-lock.yaml, and .next...`);
      await execAsync(`rm -rf ./node_modules && rm -rf ./pnpm-lock.yaml && rm -rf ./.next`, { cwd: analysisDir });

      // installing dependencies
      console.log(`\ninstalling dependencies in ${analysisDir}...`);
      await execAsync(`npm install`, { cwd: analysisDir });

      // executing eslint
      console.log(`\nExecuting ESLint in ${analysisDir}...`);
      const eslintCommand = 'npm run lint';
      console.log('ESLint Command:', eslintCommand);
      
      const { stdout: eslintOutput } = await execAsync(eslintCommand, { cwd: analysisDir });
      
      analysisResults.codeQuality = {
        message: 'ESLint analysis complete.',
        output: eslintOutput,
      };

    } catch (err) {
      const error = err as Error;
      analysisResults.codeQuality = {
        message: 'ESLint analysis complete.',
        output: error.message,
      };
    }
    
    // p2: analyze commit messages
    try {
      const { stdout: gitLog } = await execAsync(`git -C ${analysisDir} log --pretty=format:'%s'`);
      const commits = gitLog.split('\n');
      const wellWrittenCommits = commits.filter(commit =>
        /^[a-z]+(\([a-z]+\))?: .+/i.test(commit) // eg: "feat (component): added new feature"
      );
      analysisResults.commitMessages = {
        totalCommits: commits.length,
        wellWrittenCommits: wellWrittenCommits.length,
        exampleCommits: wellWrittenCommits.slice(0, 5),
      };
    } catch (err) {
      analysisResults.commitMessages = 'Error analyzing commit messages.';
    }

    return NextResponse.json({ analysis: analysisResults }, { status: 200 });

    // p3: analyze project structure and organization
    try {
      const files = await fs.readdir(analysisDir, { withFileTypes: true });
      const structure = files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
      }));
      analysisResults.projectStructure = structure;
    } catch (err) {
      analysisResults.projectStructure = 'Error analyzing project structure.';
    }

    // p4: analyze README and documentation quality
    try {
      const readmePath = path.join(analysisDir, 'README.md');
      const readmeContent = await fs.readFile(readmePath, 'utf-8');
      analysisResults.readme = {
        exists: true,
        content: readmeContent.slice(0, 500), // Show first 500 characters
      };
    } catch (err) {
      analysisResults.readme = { exists: false, message: 'README.md not found or inaccessible.' };
    }

    // p5: analyze problem-solving approach and algorithms
    try {
      const sourceFiles = await fs.readdir(analysisDir);
      const jsFiles = sourceFiles.filter(file => file.endsWith('.js') || file.endsWith('.ts'));
      const algorithmComplexity = [];
      for (const file of jsFiles) {
        const filePath = path.join(analysisDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const lineCount = content.split('\n').length;
        algorithmComplexity.push({ file, lines: lineCount });
      }
      analysisResults.problemSolving = algorithmComplexity;
    } catch (err) {
      analysisResults.problemSolving = 'Error analyzing algorithms.';
    }

    return NextResponse.json({ analysis: analysisResults }, { status: 200 });
    
    
  } catch (err) {
    console.error('Unexpected error during analysis:', err);
    return NextResponse.json(
      { error: 'Unexpected error occurred during analysis.' },
      { status: 500 }
    );
  }
}
