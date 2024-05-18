import express from "express";
import { signupWithEmail } from "~/controller/auth";

const router = express.Router();

router.post("/signup-email", signupWithEmail);
export default router;