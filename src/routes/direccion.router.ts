import { DireccionController } from "../controllers/direccion.controller";
import { genericRoutes } from "../generics/genericRoute";
import { Direccion } from "../models/direccion.model";
import { DireccionEsquema } from "../schemas/direccion.schema";
import { Request, Response } from "express";
import { RequestExt } from "../types";

export const direccionRouter = () => {
	const direccionRoutes = genericRoutes(Direccion, DireccionEsquema);

	const direccionController = new DireccionController();

	direccionRoutes.get("/", (req: Request, res: Response) =>
		direccionController.getAll(req, res)
	);

	direccionRoutes.get("/getAllDeleted", (req: Request, res: Response) =>
		direccionController.getAllDeleted(req, res)
	);

	direccionRoutes.get("/:id", (req: Request, res: Response) =>
		direccionController.getById(req, res)
	);

	direccionRoutes.post("/", (req: RequestExt, res: Response) =>
		direccionController.create(req, res)
	);

	direccionRoutes.patch("/:id", (req: Request, res: Response) =>
		direccionController.update(req, res)
	);

	direccionRoutes.delete("/:id", (req: Request, res: Response) =>
		direccionController.delete(req, res)
	);

	direccionRoutes.delete("/logicDelete/:id", (req: Request, res: Response) =>
		direccionController.logicDelete(req, res)
	);

	direccionRoutes.patch("/restore/:id", (req: Request, res: Response) =>
		direccionController.restoreLogicDeleted(req, res)
	);

	return direccionRoutes;
};
