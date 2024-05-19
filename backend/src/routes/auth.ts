import express from "express";
import test from "node:test";
import { alchemyWebhooks, signupWithEmail } from "~/controller/auth";

const router = express.Router();

router.get("/test", test);
router.post("/signup-email", signupWithEmail);
router.post("/webhooks", alchemyWebhooks);
export default router;
