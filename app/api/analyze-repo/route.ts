import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

type AnalysisResults = {
  codeQuality?: {
    message: string;
    output: string;
  };
  commitMessages?: {
    totalCommits: number;
    wellWrittenCommits: number;
    exampleCommits: string[];
  } | string;
  projectStructure?: { name: string; type: string }[] | string;
  readme?: {
    exists: boolean;
    content?: string;
  };
  documentation?: {
    exists: boolean;
    message: string;
  };
  problemSolvingApproach?: { file: string; lines: number }[] | string;
};

export async function GET(request: NextRequest) {
  try {
    const repoName = '';
    const analysisDir = path.resolve(process.cwd(), './analysis-board', repoName);
    
    // check if the repository exists or not
    try {
      await fs.access(analysisDir);
      console.log(`\nanalysis-board repository found!`)
    } catch (err) {
      const error = err as Error;
      console.log('\nanalysis-board repository not found :(', error.message)
      return NextResponse.json(
        { error: `analysis-board repository not found :(` },
        { status: 404 }
      );
    }
    
    const analysisResults: AnalysisResults = {};
    
    // p1: analyze code quality and style consistency
    try {
      // analyzing directory contents and target repo
      console.log('\ndirectory contents found:', await fs.readdir(analysisDir));

      // removing node_modules, pnpm-lock.yaml, and .next
      console.log(`\ncleaning cache: node_modules and lock files...`);
      await execAsync(`rm -rf ./node_modules && rm -rf ./pnpm-lock.yaml && rm -rf ./.next`, { cwd: analysisDir });

      // installing dependencies
      console.log(`\ninstalling dependencies...`);
      await execAsync(`npm install`, { cwd: analysisDir });

      // updating eslint guide
      console.log('\nupdating lintrc and removing suppressed rules...');
      await execAsync(`rm -rf .eslintrc.json && curl 'https://raw.githubusercontent.com/abhijayrajvansh/github-agent/refs/heads/main/scripts/eslint-checker.json' >> .eslintrc.json`, { cwd: analysisDir });

      // executing eslint
      const eslintCommand = 'npm run lint';
      console.log('\nanalyzing repository...');
      
      const { stdout: eslintOutput } = await execAsync(eslintCommand, { cwd: analysisDir });

      analysisResults.codeQuality = {
        message: 'analysis complete, no errors found!',
        output: eslintOutput,
      };

    } catch (err) {
      const error = err as Error;
      console.log('\nanalysis complete!\nError:', error.message)

      analysisResults.codeQuality = {
        message: 'analysis complete!',
        output: error.message,
      };
    }
    
    // p2: analyze commit messages
    try {
      const { stdout: gitLog } = await execAsync(`git -C ${analysisDir} log --pretty=format:'%s'`);
      const commits = gitLog.split('\n');
      const wellWrittenCommits = commits.filter(commit =>
        /^[a-z]+(\([a-z]+\))?: .+/i.test(commit) // eg: "feat (component!): added new feature"
      );
      
      analysisResults.commitMessages = {
        totalCommits: commits.length,
        wellWrittenCommits: wellWrittenCommits.length,
        exampleCommits: wellWrittenCommits.slice(0, 5),
      };

      console.log('\nanalyzing commit messages...');

    } catch (err) {
      const error = err as Error;
      console.log('\nerror analyzing commit messages:', error.message);
      analysisResults.commitMessages = 'Error analyzing commit messages.';
    }

    // p3: analyze project structure and organization
    try {
      const files = await fs.readdir(analysisDir, { withFileTypes: true });
      
      const structure = files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
      }));
      
      console.log('\nanalyzing project structure...');
      analysisResults.projectStructure = structure;
    
    } catch (err) {
      const error = err as Error;
      console.log('\nerror analyzing project structure:', error.message);
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

      console.log('\nanalyzing documentation...');

    } catch (err) {
      const error = err as Error;
      console.log('\nerror analyzing readme:', error.message);
      analysisResults.documentation = { exists: false, message: 'README.md not found or inaccessible.' };
    }

    // p5: analyze problem-solving approach and algorithms
    try {
      const sourceFiles = await fs.readdir(analysisDir);
      const jsFiles = sourceFiles.filter(file => file.endsWith('.js') || file.endsWith('.ts'));
      
      console.log('\nanalyzing algorithms & cyclomatic complexity...');
      const algorithmComplexity = [];

      for (const file of jsFiles) {
        const filePath = path.join(analysisDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const lineCount = content.split('\n').length;
        algorithmComplexity.push({ file, lines: lineCount });
      }
      
      // architecture could be improved, ref: https://app.clickup.com/37481784/v/dc/13qv9r-4196/13qv9r-2536
      analysisResults.problemSolvingApproach = algorithmComplexity;

    } catch (err) {
      const error = err as Error;
      console.log('\nerror analyzing algorithms:', error.message);
      analysisResults.problemSolvingApproach = 'error analyzing algorithms.';
    }

    console.log('\nmetadata creation complete!');
    return NextResponse.json({ analysis: analysisResults }, { status: 200 });
    
  } catch (err) {
    const error = err as Error;
    console.error('Unexpected error during analysis:', error.message);
    return NextResponse.json(
      { error: 'Unexpected error occurred during analysis.' },
      { status: 500 }
    );
  }
}
