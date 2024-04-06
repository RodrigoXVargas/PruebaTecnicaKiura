import { GenericController } from "../generics/genericController";
import { SolicitudTrabajo } from "../models/solicitudTrabajo.model";
import { SolicitudTrabajoEsquema } from "../schemas/solicitudTrabajo.schema";
import { Profesional } from "../models/profesional.model";
import { Usuario } from "../models/usuario.model";

export class SolicitudTrabajoController extends GenericController<
	SolicitudTrabajo,
	SolicitudTrabajo
> {
	constructor() {
		super(SolicitudTrabajo, SolicitudTrabajoEsquema, [Profesional, Usuario]);
	}
}
