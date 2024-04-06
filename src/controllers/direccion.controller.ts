import { GenericController } from "../generics/genericController";
import { Direccion } from "../models/direccion.model";
import { DireccionEsquema } from "../schemas/direccion.schema";
import { Localidad } from "../models/localidad.model";

export class DireccionController extends GenericController<
	Direccion,
	Direccion
> {
	//private direccionService: DireccionService;

	constructor() {
		super(Direccion, DireccionEsquema, [Localidad]);
		//this.direccionService = new DireccionService();
	}

	/* public async createDireccion(req: RequestExt, res: Response) {
		try {
			const result = new ValidacionGenerica(DireccionEsquema).validateEsquema(
				req.body
			);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const direccion = await this.direccionService.createEntity(req.body);

			if (direccion instanceof CustomError) {
				res
					.status(direccion.codigo)
					.json({ error: true, message: direccion.message });
				return;
			}

			res.status(201).json(direccion);
		} catch (error) {
			res
				.status(500)
				.json({ error: true, message: `Error al crear el direccion ${error}` });
		}
	} */
}
