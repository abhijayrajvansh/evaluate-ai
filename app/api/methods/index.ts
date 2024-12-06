'use server'

import axios from 'axios';

export async function cloneRepo(repoUrl: string) {
  try {
    await axios.post('http://localhost:3000/api/clone-repo', { repoUrl });

    console.log('\n\n\n>repo cloned successfully!\n>repo cloned successfully!\n>repo cloned successfully!\n\n\n');

  } catch (error) {
    console.error('error during cloning:(\n', error);
  }
}