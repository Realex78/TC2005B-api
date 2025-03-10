import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controllers.js"

const router = Router();

router.get("/users/", getUsers);
router.get("/user/:id", getUser);
router.post("/user/", postUser)
router.put("/user/:id", putUser)
router.delete("/user/:id", deleteUser)

export default router;