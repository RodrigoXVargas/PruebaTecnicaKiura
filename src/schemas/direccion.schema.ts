import z from "zod";
import { LocalidadEsquema } from "./localidad.schema";

export const DireccionEsquema = z.object({
	calle: z.string({
		invalid_type_error: "La calle debe ser un string",
		required_error: "La calle es requerido",
	}),

	numeracion: z
		.number({
			invalid_type_error: "La numeración debe ser un número entero",
		})
		.int()
		.positive(),

	piso: z
		.number({
			invalid_type_error: "El piso debe ser un número",
		})
		.int()
		.positive()
		.optional(),

	codigoPostal: z
		.number({
			invalid_type_error: "El código postal debe ser un número",
			required_error: "El código postal es requerido",
		})
		.int()
		.positive(),

	urlUbicacion: z
		.string()
		.url({
			message: "La url debe ser valida",
		})
		.startsWith("https://www.google.com/maps/place/", {
			message: "La url tiene que ser de Google Maps.",
		})
		.optional(),

	id_localidad: LocalidadEsquema,
});
