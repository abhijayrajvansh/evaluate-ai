"use client";

import React, { useState } from "react";
import DashboardNavigationContainer from "../parts/DashboardNavigationContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle,
  XCircle,
  FileCode,
  FolderTree,
  FileText,
  Brain,
  FolderGit,
} from "lucide-react";
import axios from "axios";
import { cloneRepo, sanitizeJunk } from "@/app/api/methods";
import { AnalysisResults } from "@/types";

const AnalyzeGithubProjects = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState("");

  const analyzeRepo = async () => {
    setLoading(true);
    setError("");

    try {
      await sanitizeJunk();
      await cloneRepo(repoUrl);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/api/analyze-repo");
      setResults(response.data.analysis);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardNavigationContainer>
      <h2 className="text-3xl font-bold tracking-tight">
        Code Quality Analysis
      </h2>
      <div>
      <div className="flex gap-4 mt-5 w-[400px]">
        <Input
          placeholder="enter repository url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button onClick={analyzeRepo} disabled={loading ? true : false}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Analyze
        </Button>
      </div>
      {!results && <p className="text-xs text-gray-500 mt-3">Add a project and click on analyze to generate report.</p>}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Code Quality Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Linting & Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {results.codeQuality?.message}
              </p>
              <pre className="mt-2 max-h-40 overflow-auto rounded bg-secondary p-4 text-xs">
                {results.codeQuality?.output}
              </pre>
            </CardContent>
          </Card>

          {/* Commit Analysis Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderGit className="h-5 w-5" />
                Total Commit 
              </CardTitle>
            </CardHeader>
            <CardContent>
              {typeof results.commitMessages === "object" && (
                <>
                  <div className="flex gap-4">
                    <Badge variant="outline">
                      Total: {results.commitMessages.totalCommits}
                    </Badge>
                    <Badge variant="outline">
                      Well Written: {results.commitMessages.wellWrittenCommits}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-2 font-semibold">Example Commits:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {results.commitMessages.exampleCommits.map(
                        (commit: string, i: number) => (
                          <li key={i}>{commit}</li>
                        )
                      )}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Project Structure Card */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Project Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(results.projectStructure) && (
                <div className="space-y-2">
                  {results.projectStructure.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.type === "directory" ? "default" : "secondary"
                        }
                      >
                        {item.type}
                      </Badge>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}

          {/* Documentation Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.readme && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {results.readme.exists ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>README.md</span>
                  </div>
                  {results.readme.content && (
                    <pre className="max-h-40 overflow-auto rounded bg-secondary p-4 text-xs">
                      {results.readme.content}
                    </pre>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Problem Solving Approach Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Problem Solving Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(results.problemSolvingApproach) && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.problemSolvingApproach.map((file, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <p className="font-medium">{file.file}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.lines} lines of code
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardNavigationContainer>
  );
};

export default AnalyzeGithubProjects;
