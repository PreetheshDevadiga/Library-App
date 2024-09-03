//Note: We can give a robust implementation using a validation lib such as zod and then export the parsed object
import { configDotenv } from "dotenv";
configDotenv();
export interface AppEnv {
ACCESS_TOKEN_SECRET:string;
DATABASE_URL: string;
REFRESH_TOKEN_SECRET:string;
GOOGLE_CLIENT_ID:string;
GOOGLE_CLIENT_SECRET:string;
GOOGLE_REDIRECT_URI:string;
}

export const AppEnvs = process.env as unknown as AppEnv;
