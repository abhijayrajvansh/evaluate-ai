'use client'

import { api } from '@/trpc/react';  // Changed from '@/trpc/server' to '@/utils/api'
import React, { useState } from 'react';

const Dashboard = () => {
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [githubToken, setGithubToken] = useState('');

  const eslintMutation = api.project.eslintCheck.useMutation({
    onSuccess: (data) => {
      console.log('ESLint check results:', data);
    },
    onError: (error) => {
      console.error('Error running ESLint check:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    eslintMutation.mutate({
      githubRepoUrl,
      githubToken: githubToken || undefined,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ESLint Repository Check</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block mb-2">
            GitHub Repository URL:
          </label>
          <input
            id="repoUrl"
            type="url"
            value={githubRepoUrl}
            onChange={(e) => setGithubRepoUrl(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div>
          <label htmlFor="token" className="block mb-2">
            GitHub Access Token (optional):
          </label>
          <input
            id="token"
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="ghp_xxxxxxxxxxxxx"
          />
        </div>
        <button
          type="submit"
          disabled={eslintMutation.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {eslintMutation.isPending ? 'Checking...' : 'Run ESLint Check'}
        </button>
      </form>
      
      {eslintMutation.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {eslintMutation.error.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;