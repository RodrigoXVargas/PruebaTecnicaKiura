import { CategoriaController } from "../controllers/categoria.controller";
import { genericRoutes } from "../generics/genericRoute";
import { Categoria } from "../models/categoria.model";
import { CategoriaEsquema } from "../schemas/categoria.schema";
import { Request, Response } from "express";

export const categoriaRouter = () => {
	const categoriaRoutes = genericRoutes(Categoria, CategoriaEsquema);

	const categoriaController = new CategoriaController();

	categoriaRoutes.get("/", (req: Request, res: Response) =>
		categoriaController.getAll(req, res)
	);

	categoriaRoutes.get("/getAllDeleted", (req: Request, res: Response) =>
		categoriaController.getAllDeleted(req, res)
	);

	categoriaRoutes.get("/:id", (req: Request, res: Response) =>
		categoriaController.getById(req, res)
	);

	categoriaRoutes.post("/", (req: Request, res: Response) =>
		categoriaController.create(req, res)
	);

	categoriaRoutes.patch("/:id", (req: Request, res: Response) =>
		categoriaController.update(req, res)
	);

	categoriaRoutes.delete("/:id", (req: Request, res: Response) =>
		categoriaController.delete(req, res)
	);

	categoriaRoutes.delete("/logicDelete/:id", (req: Request, res: Response) =>
		categoriaController.logicDelete(req, res)
	);

	categoriaRoutes.patch("/restore/:id", (req: Request, res: Response) =>
		categoriaController.restoreLogicDeleted(req, res)
	);

	return categoriaRoutes;
};
