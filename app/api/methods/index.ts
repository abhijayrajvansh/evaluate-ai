import axios from 'axios';

export async function cloneRepo(repoUrl: string) {
  try {
    await axios.post('/api/clone-repo', { repoUrl });
    console.log('\n>repo cloned successfully!');
  } catch (error) {
    console.error('error during cloning:(\n', error);
  }
}