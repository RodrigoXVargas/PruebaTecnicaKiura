import { NextFunction, Response } from "express";
import { obtenerUserByJWT } from "../utils/jwt";
import { CustomError, RequestExt } from "../types";

/**
 La función `checkJwt` es un middleware que verifica el token JWT en el encabezado de autorización de una solicitud y establece la información del usuario en la propiedad `req.usuario` si el token es válido.
  @return En este fragmento de código, si el token no se proporciona en el encabezado de autorización o si el token no es válido o ha caducado, se devuelve una respuesta JSON con un mensaje de error apropiado y un código de estado de 401 (no autorizado). Si el token es válido, el objeto de usuario extraído del token se asigna a la propiedad `req.usuario` y se llama a la función `next()` para pasar al siguiente
 */
export const checkJwt = async (
	req: RequestExt,
	res: Response,
	next: NextFunction,
	rolAccess: string[]
) => {
	try {
		const usuarioEncontrado = await obtenerUserByJWT(req);

		if (usuarioEncontrado instanceof CustomError) {
			res
				.status(usuarioEncontrado.codigo)
				.json({ mensaje: usuarioEncontrado.message });
			return;
		}

		let rolAutorizado = false;

		rolAccess.forEach((rolAccessElement) => {
			if (usuarioEncontrado.rol === rolAccessElement) {
				req.usuarioId = usuarioEncontrado.id;
				rolAutorizado = true;
			}
		});

		if (rolAutorizado) {
			next();
		} else {
			res.status(401).json({ error: true, mensaje: "No autorizado por rol" });
			return;
		}
	} catch (error: unknown) {
		console.error("Error al verificar el token:", error);
		if (error instanceof Error) {
			res.status(401).json(new CustomError(error.message, 401));
		} else {
			res.status(500).json(new CustomError("Error desconocido", 500));
		}
	}
};
