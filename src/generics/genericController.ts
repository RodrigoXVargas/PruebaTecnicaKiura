import { Model } from "sequelize-typescript";
import { Request, Response } from "express";
import z from "zod";
import { WhereOptions } from "sequelize";
import { jsonProcess, paginar } from "../utils/funciones";
import { ValidacionGenerica } from "./genericValidation";
import { BaseService } from "./genericService";
import { CustomError } from "../types";

/* La clase GenericController es una clase que proporciona operaciones CRUD genéricas para un determinado modelo y esquema. */
export class GenericController<T extends Model<T> & K, K> {
	private service;
	private schema;

	/**
	 * La función constructora inicializa una nueva instancia de un repositorio con un modelo y esquema
	 * determinados.
	 * @param modelo - El parámetro `modelo` es un tipo genérico que representa la clase del modelo.
	 * Se espera que sea una clase de la que se pueda crear una instancia usando la palabra clave `new`
	 * y que también tenga la misma estructura como la clase `Model` de sequelize. Este parámetro se
	 * utiliza para crear una instancia del Clase `BaseRepository`
	 * @param esquema: el parámetro `schema` es un objeto de esquema Zod. Zod es un esquema basado en
	 * TypeScript biblioteca de validación que le permite definir y validar estructuras de datos.
	 * En este caso, el parámetro `schema` se utiliza para definir la forma y las reglas de validación
	 * de los datos que serán almacenado en el repositorio.
	 */
	constructor(
		modelo: { new (): T } & typeof Model,
		schema: z.AnyZodObject,
		includes: any[]
	) {
		this.service = new BaseService(modelo, includes);
		this.schema = schema;
	}

	/**
	 * Esta función recupera todas las entidades no eliminadas logicamente según los parámetros de
	 * consulta proporcionados y las devuelve como una respuesta JSON.
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns una respuesta JSON que contiene las entidades que se recuperaron de la base de datos o
	 * un mensaje de error tambien en formato JSON
	 */
	async getAll(req: Request, res: Response) {
		try {
			let whereOptions: WhereOptions = {};
			if (req.query !== null) {
				whereOptions = this.schema.partial().parse(req.query);
			}

			// Paginación
			const page = parseInt(req.query.page as string) || 1;
			const limit = 10;
			const offset = (page - 1) * limit;

			const entidades = await this.service.findAllEntities(whereOptions, {
				limit,
				offset,
			});

			if (entidades instanceof CustomError) {
				res
					.status(entidades.codigo)
					.json({ error: true, message: entidades.message });
				return;
			}

			const paginationInfo = paginar(page, limit, entidades.length);

			res.json({
				...paginationInfo,
				data: entidades,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener las entidades",
				});
			}
		}
	}

	/**
	 * Esta función recupera todas las entidades activas y eliminadas logicamnete y maneja cualquier
	 * error que ocurra en el proceso.
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns una lista de entidades eliminadas.
	 */
	async getAllDeleted(req: Request, res: Response) {
		try {
			// Paginación
			const page = parseInt(req.query.page as string) || 1;
			const limit = 10;
			const offset = (page - 1) * limit;

			const entidades = await this.service.findAllDeletedEntities({
				limit,
				offset,
			});

			if (entidades instanceof CustomError) {
				res
					.status(entidades.codigo)
					.json({ error: true, message: entidades.message });
				return;
			}

			const paginationInfo = paginar(page, limit, entidades.length);

			res.json({
				...paginationInfo,
				data: entidades,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener las entidades",
				});
			}
		}
	}

	/**
	 * Esta función maneja una solicitud para recuperar una entidad por su ID, devolviendo la entidad
	 * si se encuentra o un mensaje de error si no.
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns la entidad encontrada por la identificación por el id dado o un mensaje de error.
	 */
	async getById(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const entidad = await this.service.findByIdEntity(id);

			if (entidad instanceof CustomError) {
				res
					.status(entidad.codigo)
					.json({ error: true, message: entidad.message });
				return;
			}
			res.json(entidad);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}

	/**
	 * Esta función valida el body de la request en funcion del esquema de Zod, llama al servicio para que
	 * guarde la entidad en función de los datos del body ya validados y devuelve la entidad guardada.
	 * En caso de errores en cada paso, detiene la ejecucion de la funcion y devuelve una respuesta JSON
	 * con el mensaje de error
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns los datos de la entidad creada o, si ocurre, un mensaje de error diferente en base a donde
	 * se produjo el error
	 */
	async create(req: Request, res: Response) {
		try {
			const result = new ValidacionGenerica(this.schema).validateEsquema(
				req.body
			);

			if (!result.success) {
				const messageError = jsonProcess(JSON.parse(result.error.message));
				res.status(422).json({ error: true, message: messageError });
				return;
			}

			const entidadCreada = await this.service.createEntity(req.body);
			//const entidadCreada = new CustomError('entidad ficticia creada ', 200)

			if (entidadCreada instanceof CustomError) {
				res
					.status(entidadCreada.codigo)
					.json({ error: true, message: entidadCreada.message });
				return;
			}

			res.status(201).json(entidadCreada);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}

	/**
	 * Esta función valida el body de la request en funcion del esquema de Zod, llama al servicio para que
	 * actualice la entidad en función del parametro del id y los datos del body ya validados y devuelve la
	 * entidad actualizada. En caso de errores en cada paso, detiene la ejecucion de la funcion y devuelve
	 * una respuesta JSON con el mensaje de error
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns una respuesta JSON. Si hay un error de validación, devuelve un objeto JSON con un error
	 * mensaje y un código de estado de 422. Si la entidad se actualiza correctamente, devuelve la
	 * información actualizada de la entidad como objeto JSON. Si hay un error durante el proceso de
	 * actualización, devuelve un objeto JSON con un mensaje de error y un código de estado basado en el
	 * error.
	 */
	async update(req: Request, res: Response) {
		try {
			const result = new ValidacionGenerica(this.schema).validateParcialEsquema(
				req.body
			);

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

			if (id === undefined)
				res.status(404).json({
					error: true,
					message: "Debe proporcionar un id para modificar",
				});
			const entidadCreada = await this.service.updateEntity(id, req.body);

			if (entidadCreada instanceof CustomError) {
				res
					.status(entidadCreada.codigo)
					.json({ error: true, message: entidadCreada.message });
				return;
			}

			res.json(entidadCreada);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}

	/**
	 * Esta función maneja la eliminación fisica de una entidad en función de su ID y devuelve una respuesta
	 * con status 201 o un mensaje de error diferente segun donde se produjo
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns Si la variable `entidad` es una instancia de `CustomError`, entonces una respuesta JSON con
	 * el mensaje de error y el código de estado especificado en la instancia `CustomError`. De lo
	 * contrario, una respuesta con status 204 si la eliminación se hace correctamente
	 */
	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const entidad = await this.service.deleteEntity(id);

			if (entidad instanceof CustomError) {
				res
					.status(entidad.codigo)
					.json({ error: true, message: entidad.message });
				return;
			}

			res.status(204).end();
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}

	/**
	 * Esta función realiza la obtención del id por parametro y llama al servicio para realizar la baja
	 * logica de la entidad
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns Si la variable `entidad` es una instancia de `CustomError`, entonces una respuesta JSON con
	 * el mensaje de error y el código de estado especificado en la instancia `CustomError`. De lo
	 * contrario, una respuesta con status 204 si la eliminación se hace correctamente
	 */
	async logicDelete(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const entidad = await this.service.logicDelete(id);

			if (entidad instanceof CustomError) {
				res
					.status(entidad.codigo)
					.json({ error: true, message: entidad.message });
				return;
			}

			res.status(204).end();
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}

	/**
	 * Esta funcion realiza la logica para restaurar una entidad eliminada lógicamente
	 * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
	 * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
	 * método de solicitud, encabezados, parámetros de consulta y cuerpo.
	 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
	 * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
	 * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
	 * fragmento de código, se utiliza para enviar respuestas en formato JSON
	 * @returns la entidad restaurada o un mensaje de error diferente dependiendo de donde ocurrió el error
	 */
	async restoreLogicDeleted(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const entidad = await this.service.restoreLogicDeleted(id);

			if (entidad instanceof CustomError) {
				res
					.status(entidad.codigo)
					.json({ error: true, message: entidad.message });
				return;
			}

			res.json(entidad);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: true, message: error.message });
			} else {
				res.status(500).json({
					error: true,
					message: "Error desconocido al obtener la entidad por id",
				});
			}
		}
	}
}
