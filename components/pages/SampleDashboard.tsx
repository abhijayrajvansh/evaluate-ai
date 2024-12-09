"use client"

import { useState } from 'react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { GitBranch, GitCommit, GitPullRequest, Star } from 'lucide-react'

// Mock data
const mockUserData = {
  username: "githubusername",
  name: "Anon Ymous",
  avatar: "https://github.com/octocat.png",
  followers: 3938,
  following: 9,
  publicRepos: 8,
  contributions: 1452,
}

const mockActivityData = [
  { month: "Jan", commits: 65, prs: 13, issues: 23 },
  { month: "Feb", commits: 59, prs: 11, issues: 19 },
  { month: "Mar", commits: 80, prs: 15, issues: 28 },
  { month: "Apr", commits: 81, prs: 16, issues: 30 },
  { month: "May", commits: 56, prs: 10, issues: 18 },
  { month: "Jun", commits: 55, prs: 9, issues: 20 },
  { month: "Jul", commits: 40, prs: 7, issues: 15 },
]

const mockLanguagesData = [
  { name: "JavaScript", value: 40 },
  { name: "Python", value: 30 },
  { name: "TypeScript", value: 20 },
  { name: "Java", value: 10 },
]

const mockTopRepos = [
  { name: "awesome-project", stars: 1234, forks: 567 },
  { name: "cool-lib", stars: 890, forks: 234 },
  { name: "useful-tool", stars: 567, forks: 123 },
]

export default function GithubProfileAnalytics() {
  const [username, setUsername] = useState(mockUserData.username)

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
            <AvatarFallback>{mockUserData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{mockUserData.name}</h1>
            <p className="text-sm text-muted-foreground">@{mockUserData.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button>Analyze</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserData.contributions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserData.followers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Repositories</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserData.publicRepos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockActivityData.reduce((sum, month) => sum + month.prs, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                commits: {
                  label: "Commits",
                  color: "hsl(var(--chart-1))",
                },
                prs: {
                  label: "Pull Requests",
                  color: "hsl(var(--chart-2))",
                },
                issues: {
                  label: "Issues",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockActivityData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="commits" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="prs" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="issues" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Languages</CardTitle>
            <CardDescription>Distribution of programming languages in public repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Usage",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockLanguagesData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Top Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mockTopRepos.map((repo) => (
              <div key={repo.name} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{repo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{repo.name}</p>
                  <p className="text-sm text-muted-foreground">
                    <Star className="mr-1 inline-block h-3 w-3" />
                    {repo.stars} stars
                  </p>
                </div>
                <div className="ml-auto font-medium">{repo.forks} forks</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}