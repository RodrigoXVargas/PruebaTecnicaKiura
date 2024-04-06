import z from "zod";
import { DireccionEsquema } from "./direccion.schema";
import { Roles } from "../enums/rol";

const validarNombre: RegExp = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;

export const UsuarioEsquema = z.object({
	nombre: z
		.string({
			invalid_type_error: "El nombre debe ser un string",
			required_error: "El nombre es requerido",
		})
		.regex(validarNombre, {
			message: "El nombre está mal, debe contener solo letras",
		}),

	apellido: z
		.string({
			invalid_type_error: "El apellido debe ser un string",
			required_error: "El nombre es requerido",
		})
		.regex(validarNombre, {
			message: "El apellido está mal, debe contener solo letras",
		}),

	email: z
		.string({
			invalid_type_error: "El email debe ser un string",
			required_error: "El email es requerido",
		})
		.email(),

	password: z
		.string({
			invalid_type_error: "La contraseña debe ser un string",
			required_error: "La contraseña es requerida",
		})
		.min(4),

	rol: z.nativeEnum(Roles).default(Roles.USUARIO),

	telefono: z
		.number({
			invalid_type_error: "El telefono debe ser un numero",
			required_error: "El telefono es requerido",
		})
		.min(1000000000)
		.max(9999999999),

	activo: z
		.boolean({
			invalid_type_error: "Activo debe ser un booleano",
		})
		.optional(),

	id_direccion: DireccionEsquema,
});
