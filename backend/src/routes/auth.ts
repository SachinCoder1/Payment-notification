import express from "express";
import { alchemyWebhooks, signupWithEmail } from "~/controller/auth";

const router = express.Router();

router.get("/test", alchemyWebhooks);
router.post("/signup-email", signupWithEmail);
router.post("/webhooks", alchemyWebhooks);
export default router;
