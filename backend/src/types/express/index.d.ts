import mongoose, { ObjectId } from "mongoose";
import { UserMiddlewareType } from "..";

export {};
declare global {
  namespace Express {
    export interface Request {
      user?: UserMiddlewareType;
    }
  }
}
