import z from "zod";

import { EstadoSolicitud } from "../enums/estadoSolicitud";
import { ProfesionalEsquema } from "./profesional.schema";
import { UsuarioEsquema } from "./usuario.schema";

export const SolicitudTrabajoEsquema = z.object({
	descripcion: z.string(),

	estado: z
		.nativeEnum(EstadoSolicitud, {
			invalid_type_error: "El estado es requerido",
			required_error: "El estado es requerido",
		})
		.default(EstadoSolicitud.ENVIADA),

	presupuesto: z.number().positive(),

	id_profesional: ProfesionalEsquema,

	id_usuario: UsuarioEsquema,
});
