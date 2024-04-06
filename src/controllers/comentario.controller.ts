import { GenericController } from "../generics/genericController";
import { Comentario } from "../models/comentario.model";
import { ComentarioEsquema } from "../schemas/comentario.schema";
import { Profesional } from "../models/profesional.model";

export class ComentarioController extends GenericController<
	Comentario,
	Comentario
> {
	//private comentarioService: ComentarioService;

	constructor() {
		super(Comentario, ComentarioEsquema, [Profesional]);
		//this.comentarioService = new ComentarioService();
	}

	/* public async createComentario(req: RequestExt, res: Response) {
		try {
			const result = new ValidacionGenerica(ComentarioEsquema).validateEsquema(
				req.body
			);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const comentario = await this.comentarioService.createEntity(req.body);

			if (comentario instanceof CustomError) {
				res
					.status(comentario.codigo)
					.json({ error: true, message: comentario.message });
				return;
			}

			res.status(201).json(comentario);
		} catch (error) {
			res.status(500).json({
				error: true,
				message: `Error al crear el comentario ${error}`,
			});
		}
	} */
}
