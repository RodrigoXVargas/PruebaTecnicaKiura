import { GenericController } from "../generics/genericController";
import { Categoria } from "../models/categoria.model";
import { CategoriaEsquema } from "../schemas/categoria.schema";

export class CategoriaController extends GenericController<
	Categoria,
	Categoria
> {
	constructor() {
		super(Categoria, CategoriaEsquema, []);
	}
}
