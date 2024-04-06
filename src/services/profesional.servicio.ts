import { BaseService } from "../generics/genericService";
import { Categoria } from "../models/categoria.model";
import { CertificadoEstudio } from "../models/certificadoEstudio.model";
import { Profesional } from "../models/profesional.model";
import { Usuario } from "../models/usuario.model";
import sequelize from "../sequelize";
import { CustomError, UsuarioProfDTO } from "../types";
import { UsuarioService } from "./usuario.servicio";

export class ProfesionalService extends BaseService<Profesional, Profesional> {
	constructor() {
		super(Profesional, [Usuario, Categoria, CertificadoEstudio]);
	}

	public async create(data: UsuarioProfDTO) {
		try {
			const result = await sequelize.transaction(async (t) => {
				const checkIs = await Profesional.findOne({
					where: { dni: data.dni },
				});

				if (checkIs) {
					return new CustomError(
						`El dni ${data.dni} ya existe en la base de datos.`,
						422
					);
				}

				const categoria = await Categoria.findOne({
					where: {
						nombre: data.id_categoria,
					},
				});

				const usuario: Usuario | CustomError =
					await new UsuarioService().create({
						nombre: data.nombre,
						apellido: data.apellido,
						email: data.email,
						password: data.password,
						rol: data.rol,
						telefono: data.telefono,
						activo: data.activo,
					});

				if (usuario instanceof CustomError) return usuario;

				const profesional: Profesional = await Profesional.create({
					dni: data.dni,
					califGeneral: data.califGeneral,
					id_categoria: categoria?.id,
					id_usuario: usuario.id,
				});

				return profesional;
			});

			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}
}
