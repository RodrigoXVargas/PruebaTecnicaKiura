import z from "zod";
import { UsuarioEsquema } from "./usuario.schema";
import { Categoria } from "../models/categoria.model";

const categoriasValidas = async () => {
	const data = await Categoria.findAll();

	if (data) {
		const nombresCategorias = data.map((categoria) => categoria.nombre);
		return nombresCategorias;
	} else {
		return [];
	}
};

const validarCategoria = async (data: string) => {
	{
		const nombresCategorias = await categoriasValidas();
		let bandera = false;
		for (let index = 0; index < nombresCategorias.length; index++) {
			if (nombresCategorias[index] === data) {
				bandera = true;
				break;
			}
		}
		return bandera;
	}
};

export const ProfesionalEsquema = z.object({
	dni: z.number({
		invalid_type_error: "El dni debe ser un numero",
		required_error: "El dni es requerido",
	}),

	califGeneral: z.number().min(0).max(5).default(0).optional(),

	/* perfilImage:  */

	id_categoria: z
		.string({
			invalid_type_error: "La categoria debe ser un numero",
			required_error: "La categoria es requerido",
		})
		.refine((categoria: string) => validarCategoria(categoria), {
			message: "Esa categoria no se encuentra en la base de datos",
		}),

	id_usuario: UsuarioEsquema,
});
