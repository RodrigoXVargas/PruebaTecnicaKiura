import { Request, Response } from "express";
import { CustomError } from "../types";
import { AuthService } from "../services/auth.servicio";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public async verificarPassword(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				res
					.status(404)
					.json({ error: true, message: "Debe proporcionar email y password" });
			}

			const valido = await this.authService.validatePassword(email, password);

			if (valido instanceof CustomError) {
				res
					.status(valido.codigo)
					.json({ error: true, message: valido.message });
			} else {
				res.status(200).json(valido);
			}
		} catch (error) {
			res
				.status(500)
				.json({
					error: true,
					message: `Error al crear el verificar la contraseña ${error}`,
				});
		}
	}
}
