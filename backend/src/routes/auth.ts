import express from "express";

import {
  alchemyWebhooks,
  signupWithEmail,
  test,
  merchantOnboard,
} from "~/controller/auth";

const router = express.Router();

router.get("/test", test);
router.post("/signup-email", signupWithEmail);
router.post("/webhooks", alchemyWebhooks);
router.post("/merchant", merchantOnboard);
export default router;
