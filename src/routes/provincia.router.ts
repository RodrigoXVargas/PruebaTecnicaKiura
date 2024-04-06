import { ProvinciaController } from "../controllers/provincia.controller";
import { genericRoutes } from "../generics/genericRoute";
import { Provincia } from "../models/provincia.model";
import { ProvinciaEsquema } from "../schemas/provincia.schema";
import { Request, Response } from "express";

export const provinciaRouter = () => {
	const provinciaRoutes = genericRoutes(Provincia, ProvinciaEsquema);

	const provinciaController = new ProvinciaController();

	provinciaRoutes.get("/", (req: Request, res: Response) =>
		provinciaController.getAll(req, res)
	);

	return provinciaRoutes;
};
