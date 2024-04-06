import { GenericController } from "../generics/genericController";
import { Usuario } from "../models/usuario.model";
import { Response } from "express";
import { UsuarioService } from "../services/usuario.servicio";
import { UsuarioEsquema } from "../schemas/usuario.schema";
import { ValidacionGenerica } from "../generics/genericValidation";
import { jsonProcess } from "../utils/funciones";
import { CustomError, RequestExt } from "../types";
import { Roles } from "../enums/rol";
import { Direccion } from "../models/direccion.model";

export class UsuarioController extends GenericController<Usuario, Usuario> {
	private serviceUsuario: UsuarioService;

	constructor() {
		super(Usuario, UsuarioEsquema, [Direccion]);
		this.serviceUsuario = new UsuarioService();
	}

	public async createUser(req: RequestExt, res: Response) {
		try {
			if (req.body.rol === Roles.PROFESIONAL) {
				res.status(422).json({
					error: true,
					message: "Para profesionales, usar el endpoint de dicha entidad",
				});
				return;
			}

			const result = new ValidacionGenerica(UsuarioEsquema).validateEsquema(
				req.body
			);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const usuario = await this.serviceUsuario.create(req.body);

			if (usuario instanceof CustomError) {
				res
					.status(usuario.codigo)
					.json({ error: true, message: usuario.message });
				return;
			}

			res.status(201).json(usuario);
		} catch (error) {
			res
				.status(500)
				.json({ error: true, message: `Error al crear el usuario ${error}` });
		}
	}
}
