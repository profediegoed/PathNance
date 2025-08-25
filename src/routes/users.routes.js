import { Router } from "express";
import {
    getUsers,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    authenticateToken,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/login", loginUser);
router.post("/registro", registerUser);
router.put("/users/:correo", authenticateToken, updateUser);
router.delete("/users/:correo", authenticateToken, deleteUser);


export default router;