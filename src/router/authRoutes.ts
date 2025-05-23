import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register-professional", AuthController.registerProfessional);
router.post("/register-company", AuthController.registerCompany);

export default router;