import { NextFunction, Request, Response, Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { checkJwt } from "../middlewares/jwt";
import { Roles } from "../enums/rol";
import { RequestExt } from "../types";

export const usuarioRouter = () => {
	const usuarioRoutes = Router();

	const usuarioController = new UsuarioController();

	usuarioRoutes.get(
		"/",
		(req: Request, res: Response, next: NextFunction) =>
			checkJwt(req, res, next, [Roles.ADMINISTRADOR, Roles.SOPORTE]),
		(req: Request, res: Response) => usuarioController.getAll(req, res)
	);
	usuarioRoutes.get("/getAllDeleted/", (req: Request, res: Response) =>
		usuarioController.getAllDeleted(req, res)
	);
	usuarioRoutes.get("/getById/:id", (req: Request, res: Response) =>
		usuarioController.getById(req, res)
	);
	usuarioRoutes.post("/", (req: RequestExt, res: Response) =>
		usuarioController.createUser(req, res)
	);
	usuarioRoutes.patch("/:id", (req: Request, res: Response) =>
		usuarioController.update(req, res)
	);
	usuarioRoutes.delete("/:id", (req: Request, res: Response) =>
		usuarioController.delete(req, res)
	);
	usuarioRoutes.delete("/logicDelete/:id", (req: Request, res: Response) =>
		usuarioController.logicDelete(req, res)
	);
	usuarioRoutes.patch("/restore/:id", (req: Request, res: Response) =>
		usuarioController.restoreLogicDeleted(req, res)
	);

	return usuarioRoutes;
};
