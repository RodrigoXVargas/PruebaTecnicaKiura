import { sign, verify } from "jsonwebtoken";
import { CustomError, RequestExt } from "../types";
import { hash, compare } from "bcryptjs";
import { UsuarioService } from "../services/usuario.servicio";

const secret = process.env.JWT_SECRET_CUSTOM || "";

/**
 La función genera un token web JSON (JWT) utilizando el ID proporcionado y una clave secreta, con un tiempo de caducidad establecido en 60000 milisegundos, es decir, 1 minuto.
 @param {string} mail: a quien se genera el token.
 @return un token web JSON (JWT) generado con un minuto de validez.
 */
export const generateToken = (email: string) => {
	const jwt = sign({ email }, secret, { expiresIn: 300 });
	return jwt;
};

/**
 La función `verificarToken` verifica un token JWT usando una clave secreta.
 @param {string} jwt: El parámetro `jwt` es una cadena que representa un token web JSON (JWT).
 @return un valor booleano que indica si el token es válido o no.
*/
export const verificarToken = (jwt: string) => {
	const isOk = verify(jwt, secret);
	return isOk;
};

export const obtenerUserByJWT = async (req: RequestExt) => {
	try {
		const authorizationHeader = req.headers.authorization || "";
		const [, jwt] = authorizationHeader.split(" "); // Obtener el token después de Bearer

		if (!jwt || jwt === "null") {
			return new CustomError("No se proporcionó un token en la cabecera.", 401);
		}

		const dataToken = verificarToken(jwt) as { email: string };

		const usuarioEncontrado = await new UsuarioService().findByEmail(
			dataToken.email
		);

		return usuarioEncontrado;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return new CustomError(error.message, 500);
		} else {
			return new CustomError("Error desconocido", 500);
		}
	}
};

/**
 La función `encrypt` toma una contraseña como entrada, la codifica utilizando un algoritmo específico y un número de iteraciones, y devuelve la contraseña codificada.
  @param {string} pass: el parámetro `pass` es una cadena que representa la contraseña que debe cifrarse.
  @return Se devuelve el hash de la contraseña cifrada.
 */
export const encrypt = async (pass: string) => {
	const passwordHash = await hash(pass, 8);
	return passwordHash;
};

/**
 La función "verificada" compara una contraseña con su versión hash y devuelve si coinciden o no.
  @param {string} pass: el parámetro `pass` es una cadena que representa la contraseña que debe verificarse.
  @param {string} passHash: el parámetro `passHash` es una cadena que representa la contraseña hash.
  @return un valor booleano que indica si la contraseña proporcionada coincide con la contraseña hash.
 */
export const verified = async (pass: string, passHash: string) => {
	const isCorrect = await compare(pass, passHash);
	return isCorrect;
};
