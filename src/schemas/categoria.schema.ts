import z from "zod";

export const CategoriaEsquema = z.object({
	nombre: z.string({
		invalid_type_error: "El nombre de la categoria debe ser un string",
		required_error: "El nombre de la categoria es requerido",
	}),
});
