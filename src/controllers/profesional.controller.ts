import { GenericController } from "../generics/genericController";
import { Profesional } from "../models/profesional.model";
import { ProfesionalEsquema } from "../schemas/profesional.schema";
//import { ProfesionalService } from "../services/profesional.servicio";
import { Categoria } from "../models/categoria.model";
import { Usuario } from "../models/usuario.model";
import { CertificadoEstudio } from "../models/certificadoEstudio.model";

export class ProfesionalController extends GenericController<
	Profesional,
	Profesional
> {
	//private profesionalService: ProfesionalService;

	constructor() {
		super(Profesional, ProfesionalEsquema, [
			Usuario,
			Categoria,
			CertificadoEstudio,
		]);
		//this.profesionalService = new ProfesionalService();
	}

	/* public async createProfesional(req: RequestExt, res: Response) {
		try {
			const result = await validateProfesional(req.body);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const profesional = await this.profesionalService.create(req.body);

			if (profesional instanceof CustomError) {
				res
					.status(profesional.codigo)
					.json({ error: true, message: profesional.message });
				return;
			}

			res.status(201).json(profesional);
		} catch (error) {
			res.status(500).json({
				error: true,
				message: `Error al crear el profesional ${error}`,
			});
		}
	}

	public async updateProfesional(req: RequestExt, res: Response) {
		try {
			const result = await partialValidateProfesional(req.body);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			} else if (Object.values(result.data).length === 0) {
				const messageError = "No proporcionó atributos válidos para la entidad";
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const id = req.params.id;
			if (!id)
				res
					.status(400)
					.json({ error: true, message: "Debe proporcionar un id" });

			if (req.body.id_categoria) {
				const categoria = await Categoria.findOne({
					where: {
						nombre: req.body.id_categoria,
					},
				});

				if (categoria) {
					req.body.id_categoria = categoria.id;
				} else {
					res
						.status(404)
						.json({ error: true, message: "La categoria no existe" });
				}
			}

			const profesional = await this.profesionalService.updateEntity(
				id,
				req.body
			);

			if (profesional instanceof CustomError) {
				res
					.status(profesional.codigo)
					.json({ error: true, message: profesional.message });
				return;
			}

			res.status(201).json(profesional);
		} catch (error) {
			res.status(500).json({
				error: true,
				message: `Error al crear el profesional ${error}`,
			});
		}
	}

	public async getByUbi(req: RequestExt, res: Response) {
		try {
			const provincia = req.query.provincia;
			const localidad = req.query.localidad; 

			return;
		} catch (error) {
			res.status(500).json({
				error: true,
				message: `Error al crear el profesional ${error}`,
			});
		}
	} */
}
