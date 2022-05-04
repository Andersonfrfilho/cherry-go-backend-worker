import { Router } from "express";

import { healthcheck } from "@shared/infra/http/routes/healthcheck";

const router = Router();

router.use(healthcheck);

export { router };
