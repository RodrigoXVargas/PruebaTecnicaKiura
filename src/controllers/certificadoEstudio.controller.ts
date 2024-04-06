import { GenericController } from "../generics/genericController";
import { CertificadoEstudio } from "../models/certificadoEstudio.model";
import { Request, Response } from "express";
import { CertificadoEstudioEsquema } from "../schemas/certificadoEstudio.schema";
import { Profesional } from "../models/profesional.model";

export class CertificadoEstudioController extends GenericController<
	CertificadoEstudio,
	CertificadoEstudio
> {
	constructor() {
		super(CertificadoEstudio, CertificadoEstudioEsquema, [Profesional]);
	}

	public async prueba(_req: Request, res: Response) {
		try {
			res.json({ saludo: "certificados de estudio" });
		} catch (error) {}
	}
}
