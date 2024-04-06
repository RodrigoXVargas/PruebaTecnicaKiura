import { GenericController } from "../generics/genericController";
import { Localidad } from "../models/localidad.model";
import { LocalidadEsquema } from "../schemas/localidad.schema";
import { Provincia } from "../models/provincia.model";

export class LocalidadController extends GenericController<
	Localidad,
	Localidad
> {
	constructor() {
		super(Localidad, LocalidadEsquema, [Provincia]);
	}
}
