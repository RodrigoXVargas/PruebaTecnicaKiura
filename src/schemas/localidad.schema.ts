import z from "zod";
import { ProvinciaEsquema } from "./provincia.schema";

export const LocalidadEsquema = z.object({
	nombre: z.string({
		invalid_type_error: "El titulo debe ser un string",
		required_error: "El titulo es requerido",
	}),

	id_provincia: ProvinciaEsquema,
});
