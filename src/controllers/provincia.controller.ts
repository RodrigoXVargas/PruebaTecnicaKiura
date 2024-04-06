import { GenericController } from "../generics/genericController";
import { Provincia } from "../models/provincia.model";
import { ProvinciaEsquema } from "../schemas/provincia.schema";
import { Localidad } from "../models/localidad.model";

export class ProvinciaController extends GenericController<
	Provincia,
	Provincia
> {
	constructor() {
		super(Provincia, ProvinciaEsquema, [Localidad]);
	}
}
