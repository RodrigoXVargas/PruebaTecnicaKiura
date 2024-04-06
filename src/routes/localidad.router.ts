import { LocalidadController } from "../controllers/localidad.controller";
import { genericRoutes } from "../generics/genericRoute";
import { Localidad } from "../models/localidad.model";
import { LocalidadEsquema } from "../schemas/localidad.schema";
import { Request, Response } from "express";

export const localidadRouter = () => {
	const localidadRoutes = genericRoutes(Localidad, LocalidadEsquema);

	const localidadesController = new LocalidadController();

	localidadRoutes.get("/", (req: Request, res: Response) =>
		localidadesController.getAll(req, res)
	);

	return localidadRoutes;
};
