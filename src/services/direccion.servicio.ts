import { BaseService } from "../generics/genericService";
import { Direccion } from "../models/direccion.model";
import { Localidad } from "../models/localidad.model";

export class DireccionService extends BaseService<Direccion, Direccion> {
	constructor() {
		super(Direccion, [Localidad]);
	}
}
