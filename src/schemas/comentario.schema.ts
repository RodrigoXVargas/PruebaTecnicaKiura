import z from "zod";

export const ComentarioEsquema = z.object({
	comentario: z.string({
		invalid_type_error: "El comentario debe ser un string",
		required_error: "El comentario es requerido",
	}),

	calificacion: z
		.number({
			invalid_type_error: "La calificacion debe ser un string",
			required_error: "La calificacion es requerido",
		})
		.min(0)
		.max(5)
		.default(0),

	id_profesional: z
		.string({
			invalid_type_error: "El id del profesional  debe ser un string",
			required_error: "El id del profesional es requerido",
		})
		.uuid({
			message: "El id del profesional debe ser un uuid",
		}),
});
