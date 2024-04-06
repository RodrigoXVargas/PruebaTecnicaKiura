import { ComentarioController } from "../controllers/comentario.controller";
import { genericRoutes } from "../generics/genericRoute";
import { Comentario } from "../models/comentario.model";
import { ComentarioEsquema } from "../schemas/comentario.schema";
import { Response } from "express";
import { RequestExt } from "../types";

export const comentarioRouter = () => {
	const comentarioRoutes = genericRoutes(Comentario, ComentarioEsquema);

	const comentarioController = new ComentarioController();

	comentarioRoutes.get("/", (req: RequestExt, res: Response) =>
		comentarioController.getAll(req, res)
	);

	comentarioRoutes.get("/getAllDeleted", (req: RequestExt, res: Response) =>
		comentarioController.getAllDeleted(req, res)
	);

	comentarioRoutes.get("/:id", (req: RequestExt, res: Response) =>
		comentarioController.getById(req, res)
	);

	comentarioRoutes.post("/", (req: RequestExt, res: Response) =>
		comentarioController.createComentario(req, res)
	);

	comentarioRoutes.patch("/:id", (req: RequestExt, res: Response) =>
		comentarioController.update(req, res)
	);

	comentarioRoutes.delete("/:id", (req: RequestExt, res: Response) =>
		comentarioController.delete(req, res)
	);

	comentarioRoutes.delete(
		"/logicDelete/:id",
		(req: RequestExt, res: Response) =>
			comentarioController.logicDelete(req, res)
	);

	comentarioRoutes.patch("/restore/:id", (req: RequestExt, res: Response) =>
		comentarioController.restoreLogicDeleted(req, res)
	);

	return comentarioRoutes;
};
