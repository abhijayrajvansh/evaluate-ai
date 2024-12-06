export type AnalysisResults = {
  codeQuality?: {
    message: string;
    output: string;
  };
  commitMessages?: {
    totalCommits: number;
    wellWrittenCommits: number;
    exampleCommits: string[];
  };
  projectStructure?: {
    type: string;
    name: string;
  }[];
  readme?: {
    exists: boolean;
    content?: string;
  };
  problemSolvingApproach?: {
    file: string;
    lines: number;
  }[];
}