'use server'

import axios from 'axios';
import 'dotenv/config';

const SERVER_URL = process.env.SERVER_URL;

export async function cloneRepo(repoUrl: string) {
  try {
    
    await axios.post(`${SERVER_URL}/api/clone-repo`, { repoUrl });
    console.log('\n\nrepo cloned successfully!\n\n');
    
  } catch (error) {
    throw new Error('enter a valid repository URL');
  }
}

export async function sanitizeJunk() {
  try {
    
    await axios.get(`${SERVER_URL}/api/sanitize`);
    console.log('\n\nanalysis board sanitized successfully!\n\n');
    
  } catch (error) {
    throw new Error('error sanitizing analysis board');
  }
}