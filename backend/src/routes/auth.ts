import express from "express";

import {
  alchemyWebhooks,
  authenticateUser,
  test,
  merchantOnboard,
  getUserTransactionController,
} from "~/controller/auth";

const router = express.Router();

router.get("/test", test);
router.post("/get-user-transaction", getUserTransactionController);
router.post("/authenticate", authenticateUser);
router.post("/webhooks", alchemyWebhooks);
router.post("/merchant", merchantOnboard);
export default router;
