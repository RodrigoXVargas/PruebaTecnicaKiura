import { Router } from "express";
import { ProfesionalController } from "../controllers/profesional.controller";
import { RequestExt } from "../types";
import { Response } from "express";

//import { Request, Response } from "express";

export const profesionalRouter = () => {
	const profesionalRoutes = Router();

	const profesionalController = new ProfesionalController();

	profesionalRoutes.get("/", (req: RequestExt, res: Response) =>
		profesionalController.getAll(req, res)
	);

	profesionalRoutes.get("/getByUbi", (req: RequestExt, res: Response) =>
		profesionalController.getByUbi(req, res)
	);

	profesionalRoutes.post("/", (req: RequestExt, res: Response) =>
		profesionalController.createProfesional(req, res)
	);

	profesionalRoutes.patch("/:id", (req: RequestExt, res: Response) =>
		profesionalController.updateProfesional(req, res)
	);

	return profesionalRoutes;
};
