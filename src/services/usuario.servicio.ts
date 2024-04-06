import { BaseService } from "../generics/genericService";
import { Direccion } from "../models/direccion.model";
import { Profesional } from "../models/profesional.model";
import { Usuario } from "../models/usuario.model";
import sequelize from "../sequelize";
import { CustomError, UsuarioDTO } from "../types";
import { encrypt } from "../utils/jwt";

export class UsuarioService extends BaseService<Usuario, Usuario> {
	constructor() {
		super(Usuario, [Direccion, Profesional]);
	}

	public async create(data: UsuarioDTO) {
		try {
			const result = await sequelize.transaction(async (t) => {
				const checkIs = await Usuario.findOne({
					where: { email: data.email },
				});

				if (checkIs) {
					return new CustomError(
						`El usuario con correo electrónico ${data.email} ya existe.`,
						422
					);
				}

				const passHash = await encrypt(data.password);
				const usuario: Usuario = await Usuario.create(
					{
						nombre: data.nombre,
						apellido: data.apellido,
						telefono: data.telefono,
						email: data.email,
						password: passHash,
						rol: data.rol,
					},
					{
						transaction: t,
					}
				);

				return usuario;
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

	public async findByEmail(email: string) {
		try {
			const result = await sequelize.transaction(async (t) => {
				const user = await Usuario.findOne({
					where: { email: email },
				});

				if (!user) {
					return new CustomError(
						`El usuario con correo electrónico ${email} no existe.`,
						404
					);
				}

				return user;
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
