import { genericRoutes } from "../generics/genericRoute";
import { SolicitudTrabajo } from "../models/solicitudTrabajo.model";
import { SolicitudTrabajoEsquema } from "../schemas/solicitudTrabajo.schema";
//import { Request, Response } from "express";

export const solicitudTrabajoRouter = () => {
	const solicitudTrabajoRoutes = genericRoutes(
		SolicitudTrabajo,
		SolicitudTrabajoEsquema
	);

	return solicitudTrabajoRoutes;
};
