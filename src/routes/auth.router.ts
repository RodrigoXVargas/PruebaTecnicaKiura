import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = () => {
	const authRoutes = Router();

	const authController = new AuthController();

	authRoutes.post("/login", (req: Request, res: Response) =>
		authController.verificarPassword(req, res)
	);

	return authRoutes;
};
