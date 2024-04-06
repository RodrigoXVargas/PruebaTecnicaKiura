import z from "zod";

export const LoginEsquema = z.object({
	email: z
		.string({
			invalid_type_error: "El email debe ser un string",
			required_error: "El email es requerido",
		})
		.email(),

	//cambiar en el modelo y en el eschema
	password: z
		.string({
			invalid_type_error: "La contraseña debe ser un string",
			required_error: "La contraseña es requerida",
		})
		.min(4),
});
