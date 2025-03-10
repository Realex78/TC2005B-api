import { Router } from "express";
import { raiz, marco, ping } from "../controllers/index.controllers.js"

const router = Router();

router.get("/", raiz);
router.get("/marco", marco);
router.get("/ping", ping);

export default router;