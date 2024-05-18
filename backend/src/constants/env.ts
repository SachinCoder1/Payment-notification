import { ENV_TYPE } from "~/types";

export const ENV = process.env.NODE_ENV as ENV_TYPE;
export const PORT = process.env.PORT;

export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
