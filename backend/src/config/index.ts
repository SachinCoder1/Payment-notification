import { ENV } from "~/constants";
import { ENV_TYPE } from "~/types";

const { DEVELOPMENT, TESTING, PRODUCTION } = ENV_TYPE;

const config = {
  [DEVELOPMENT]: {
    BASE_URL: "http://localhost:8080",
    CLIENT_URL: "http://localhost:3000",
  },
  [TESTING]: {
    BASE_URL: "",
    CLIENT_URL: "",
  },
  [PRODUCTION]: {
    BASE_URL: "http:coming:soon",
    CLIENT_URL: "http:coming:soon",
  },
};

const envConfig = config[ENV];
export const BASE_URL = envConfig.BASE_URL;
export const CLIENT_URL = envConfig.CLIENT_URL;

export const API_VERSION = "v1";

export const DEFAULT_API_URL = `/api/${API_VERSION}`;
