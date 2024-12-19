import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { deb } from '@/lib/abhijay-debug';

export const projectRouter = createTRPCRouter({
  eslintCheck: publicProcedure
  
    .input(
      z.object({
        githubRepoUrl: z.string().url(),
        githubToken: z.string().optional(),
      }),
    )

    .mutation(async ({ input }) => {
      const { githubRepoUrl } = input;

      const containerName = `eslint-container-${randomUUID()}`;
      const workspacePath = `/app/workspace`;
      const startContainerCommand = `docker run -d --name ${containerName} -v /tmp:/tmp eslint-runner`;

      deb(containerName, 'starting docker container');
      execSync(startContainerCommand);

      try {
        // Retry logic to ensure the container starts
        console.log(`Waiting for container ${containerName} to start...`);
        const maxRetries = 10; // Number of retries
        const retryInterval = 1000; // Interval in ms between retries
        let containerStatus = "exited";

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          containerStatus = execSync(
            `docker inspect -f '{{.State.Status}}' ${containerName}`,
          )
            .toString()
            .trim();
          if (containerStatus === "running") {
            console.log(`Container ${containerName} is running.`);
            break;
          }
          console.log(
            `Attempt ${attempt + 1}: Container status is '${containerStatus}'. Retrying in ${retryInterval}ms...`,
          );
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }

        if (containerStatus !== "running") {
          throw new Error(
            `Container ${containerName} failed to start. Final status: ${containerStatus}`,
          );
        }

        console.log(`Creating workspace in container: ${containerName}`);
        execSync(`docker exec ${containerName} mkdir -p ${workspacePath}`);

        console.log(`Cloning files into container: ${containerName}`);
        const escapedGithubRepoUrl = githubRepoUrl.replace(/["\\]/g, "\\$&");
        const cloneCommand = `
          git clone --depth=1 --filter=blob:none --sparse "${escapedGithubRepoUrl}" .
          git sparse-checkout set '*.js' '*.ts' '*.jsx' '*.tsx'
        `;
        execSync(
          `docker exec ${containerName} bash -c "cd ${workspacePath} && ${cloneCommand}"`,
        );

        console.log(`Running ESLint on the files`);
        const eslintOutput = execSync(
          `docker exec ${containerName} bash -c "eslint --format json ${workspacePath}"`,
        ).toString();
        const eslintResults = JSON.parse(eslintOutput);

        return {
          success: true,
          results: eslintResults,
        };
      } catch (err) {
        console.error("Error occurred:", err);
        const error = err as Error;
        return {
          success: false,
          error: error.message || "Something went wrong",
        };
      } finally {
        console.log(`Stopping and removing container: ${containerName}`);
        execSync(`docker rm -f ${containerName}`);
      }
    }),
});
