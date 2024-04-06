import { BaseService } from "../generics/genericService";
import { Comentario } from "../models/comentario.model";
import { Profesional } from "../models/profesional.model";
import sequelize from "../sequelize";
import { CustomError } from "../types";
import { ProfesionalService } from "./profesional.servicio";

export class ComentarioService extends BaseService<Comentario, Comentario> {
	constructor() {
		super(Comentario, [Profesional]);
	}

	public async sacarCalificacion(id_profesional: string) {
		try {
			const result = await sequelize.transaction(async (t) => {
				const result = await Comentario.findAndCountAll({
					where: {
						id_profesional: id_profesional,
					},
				});

				if (result.count === 0) {
					return;
				} else {
					let acumulado = 0;
					result.rows.forEach((comentario) => {
						acumulado += comentario.calificacion;
					});

					const califGeneral = parseFloat(
						(acumulado / result.count).toFixed(2)
					);

					const profesional: Profesional | CustomError =
						await new ProfesionalService().updateEntity(id_profesional, {
							califGeneral: califGeneral,
						});

					if (profesional instanceof CustomError) {
						return profesional;
					} else {
						return "Se actualizó la calificacion general del profesional";
					}
				}
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
