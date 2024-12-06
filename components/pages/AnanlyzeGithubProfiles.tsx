'use client'

import React from "react";
import DashboardNavigationContainer from "../parts/DashboardNavigationContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AnanlyzeGithubProfiles = () => {

  const handleAnalyzeGithubProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Analyzing Github Profile...');
  }

  return (
    <DashboardNavigationContainer>
        <h2 className="text-3xl font-bold tracking-tight">Github Profile Analysis</h2>

        <form onSubmit={handleAnalyzeGithubProfile} className="flex justify-start gap-4 w-[400px]">
          <Input placeholder="enter github username or profile link" />
          <Button type="submit">Analyze</Button>
        </form>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Repository Quality Card */}
          <Card>
            <CardHeader>
              <CardTitle>Repository Quality</CardTitle>
              <CardDescription>Analysis of code quality and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Code Quality</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge>Clean Code</Badge>
                  <Badge>Well Documented</Badge>
                  <Badge>Best Practices</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commit History Card */}
          <Card>
            <CardHeader>
              <CardTitle>Commit Activity</CardTitle>
              <CardDescription>Contribution patterns and consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Consistency</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Daily Commits</Badge>
                  <Badge variant="secondary">Clear Messages</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Diversity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Languages and frameworks used</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[120px]">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">AWS</Badge>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Pull Requests Card */}
          <Card>
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>PRs and issue management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>PR Quality</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge>Well Documented</Badge>
                  <Badge>Timely Response</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Source Card */}
          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
              <CardDescription>Community involvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Contribution Level</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Active Contributor</Badge>
                  <Badge variant="secondary">Community Member</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Impact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Project Impact</CardTitle>
              <CardDescription>Repository metrics and reach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1.2k</div>
                    <div className="text-sm text-muted-foreground">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">340</div>
                    <div className="text-sm text-muted-foreground">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">15k</div>
                    <div className="text-sm text-muted-foreground">Downloads</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </DashboardNavigationContainer>
  );
};

export default AnanlyzeGithubProfiles;
