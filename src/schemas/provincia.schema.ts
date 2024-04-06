import z from "zod";

export const ProvinciaEsquema = z.object({
	nombre: z.string({
		invalid_type_error: "El titulo debe ser un string",
		required_error: "El titulo es requerido",
	}),
});
