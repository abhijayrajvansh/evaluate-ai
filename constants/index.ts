import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL;

console.log("NODE_ENV: ", NODE_ENV);
console.log("DATABASE_URL: ", DATABASE_URL);