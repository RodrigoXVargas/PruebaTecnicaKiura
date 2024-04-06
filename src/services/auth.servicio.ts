import { CustomError } from "../types";
import { generateToken, verified } from "../utils/jwt";
import { UsuarioService } from "./usuario.servicio";

export class AuthService {
	constructor(private userService: UsuarioService = new UsuarioService()) {}

	public async validatePassword(email: string, password: string) {
		try {
			const user = await this.userService.findByEmail(email);

			if (!user || user instanceof CustomError) {
				return new CustomError("CREDENCIALES_INCORRECTAS", 404);
			}

			const passwordCorrect = await verified(password, user.password);

			if (!passwordCorrect)
				return new CustomError("CREDENCIALES_INCORRECTAS", 404);

			const token = generateToken(user.email);
			// Contiene el token y el usuario
			const data = { token };
			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}
}
