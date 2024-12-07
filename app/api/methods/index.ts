'use server'

import axios from 'axios';

export async function cloneRepo(repoUrl: string) {
  try {
    await axios.post('http://localhost:3000/api/clone-repo', { repoUrl });
    console.log('\n\nrepo cloned successfully!\n\n');
  } catch (error) {
    throw new Error('enter a valid repository URL');
  }
}