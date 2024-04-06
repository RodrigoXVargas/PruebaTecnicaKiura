import z from "zod";
import { ProfesionalEsquema } from "./profesional.schema";

export const CertificadoEstudioEsquema = z.object({
	titulo: z.string({
		invalid_type_error: "El titulo debe ser un string",
		required_error: "El titulo es requerido",
	}),

	institucion: z.string({
		invalid_type_error: "El institucion debe ser un string",
		required_error: "El institucion es requerido",
	}),

	id_profesional: ProfesionalEsquema,
});
