import { CertificadoEstudioController } from "../controllers/certificadoEstudio.controller";
import { genericRoutes } from "../generics/genericRoute";
import { CertificadoEstudio } from "../models/certificadoEstudio.model";
import { CertificadoEstudioEsquema } from "../schemas/certificadoEstudio.schema";
import { Request, Response } from "express";

export const certificadoEstudioRouter = () => {
	const certificadoEstudioRoutes = genericRoutes(
		CertificadoEstudio,
		CertificadoEstudioEsquema
	);

	const certificadoEstudioController = new CertificadoEstudioController(
		CertificadoEstudio,
		CertificadoEstudioEsquema,
		[]
	);

	certificadoEstudioRoutes.get("/prueba", (req: Request, res: Response) =>
		certificadoEstudioController.prueba(req, res)
	);

	return certificadoEstudioRoutes;
};
