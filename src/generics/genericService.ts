import { Model } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";
import { Attributes, FindOptions, WhereOptions } from "sequelize";

import sequelize from "../sequelize";
import { CustomError } from "../types";

/* La clase `BaseRepository` es un repositorio genérico que proporciona operaciones CRUD comunes para un 
determinado modelo. */
export class BaseService<T extends Model<T> & K, K> {
	private relation: { new (): T } & typeof Model;
	private includes: any[];
	/**
	 * El constructor toma un parámetro de relación que es una nueva instancia de una clase que extiende
	 * de la clase Model de sequelize.
	 * @param relation: el parámetro `relation` es un tipo que representa un constructor de clase. Es
	 * un tipo genérico `T` que extiende `Model` y también tiene las propiedades y métodos estáticos del
	 * Clase `Model` de sequelize.
	 */
	constructor(relation: { new (): T } & typeof Model, includes: any[]) {
		this.relation = relation;
		this.includes = includes;
	}

	/**
	 * La función `findAllEntities` es una función asincrónica que toma `whereOptions` y `opciones` como
	 * parámetros y devuelve una promesa que se resuelve en una matriz de entidades o un objeto
	 * 'CustomError`.
	 * @param whereOptions - El parámetro `whereOptions` es un objeto que especifica las condiciones para
	 * filtrar las entidades a recuperar. Puede incluir atributos y sus correspondientes valores para
	 * comparar en la consulta de la base de datos.
	 * @param {FindOptions} options - El parámetro `opciones` es un objeto que contiene información
	 * adicional opciones para la consulta. Estas opciones pueden incluir cosas como clasificación,
	 * paginación e incluir/excluir ciertos atributos del conjunto de resultados.
	 * @returns una Promesa que se resuelve en una matriz de entidades de tipo T o en un objeto
	 * CustomError
	 */
	public async findAllEntities(
		whereOptions: WhereOptions<Attributes<T>>,
		options: FindOptions
	): Promise<T[] | CustomError> {
		try {
			const entityPartial: WhereOptions<Attributes<T>> = whereOptions;
			return await this.relation.findAll<T>({
				...options,
				where: entityPartial,
				include: this.includes,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * La función `findAllDeletedEntities` es una función asincrónica que recupera todas las entidades
	 * eliminadas, basadas en las opciones proporcionadas y devuelve una matriz de entidades o un objeto
	 * `CustomError`.
	 * @param {FindOptions} options - El parámetro `options` es un objeto que contiene información
	 * adicional para encontrar entidades eliminadas. Puede incluir propiedades como "where", "order",
	 * `limit` y `offset` para especificar las condiciones y el orden de los resultados de la consulta.
	 * @returns La función `findAllDeletedEntities` devuelve una promesa que se resuelve en una matriz de
	 * entidades `T[]` o un objeto `CustomError`.
	 */
	public async findAllDeletedEntities(
		options: FindOptions
	): Promise<T[] | CustomError> {
		try {
			return await this.relation.findAll<T>({
				...options,
				paranoid: false,
				include: this.includes,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * Esta función encuentra una entidad por su ID y la devuelve, o devuelve un error personalizado si
	 * la entidad no se encuentra o se produce un error.
	 * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de
	 * la entidad que deseas encontrar.
	 * @returns una Promesa que se resuelve en una instancia de tipo T o en un objeto CustomError.
	 */
	public async findByIdEntity(id: string): Promise<T | CustomError> {
		try {
			const entidad: T | null = await this.relation.findByPk<T>(id, {
				include: this.includes,
			});

			if (entidad) {
				return entidad;
			} else {
				return new CustomError("Entidad no encontrada", 404);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * Esta función crea una entidad utilizando los datos proporcionados y devuelve la entidad creada
	 * o un error personalizado.
	 * @param data - El parámetro `data` es de tipo `MakeNullishOptional<T["_creationAttributes"]>` y
	 * refiere los datos de la entidad que desea ser guardada
	 * @returns La función `createEntity` devuelve una Promesa que se resuelve en una instancia de
	 * la entidad `T` o una instancia de `CustomError`.
	 */
	public async createEntity(
		data: MakeNullishOptional<T["_creationAttributes"]>
	): Promise<T | CustomError> {
		try {
			const result = await sequelize.transaction(async (transaccion) => {
				return await this.relation.create<T>(data, {
					transaction: transaccion,
				});
			});
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * La función `updateEntity` actualiza una entidad con el ID y los datos proporcionados, devolviendo
	 * la información actualizada de la entidad o un error personalizado.
	 * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
	 * entidad que desea actualizar.
	 * @param data - El parámetro `data` es de tipo `Partial<T>`, lo que significa que es un objeto que
	 * contiene propiedades parciales de tipo `T`. La "T" representa el tipo de entidad que se está
	 * actualizando.
	 * @returns una Promesa que se resuelve en una instancia de tipo T (la entidad actualizada) o en una
	 * instancia de CustomError.
	 */
	public async updateEntity(
		id: string,
		data: Partial<T>
	): Promise<T | CustomError> {
		try {
			const result = await sequelize.transaction(async (transaccion) => {
				const whereOptions: WhereOptions = { id: id };

				const [numUpdatedRows, updatedEspecialidad] =
					await this.relation.update<T>(data, {
						where: whereOptions,
						returning: true,
						transaction: transaccion,
					});

				if (
					numUpdatedRows > 0 &&
					updatedEspecialidad &&
					updatedEspecialidad.length > 0
				) {
					return updatedEspecialidad[0];
				} else {
					return new CustomError("Entidad no encontrada", 404);
				}
			});

			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * La función `deleteEntity` es una función asincrónica que elimina una entidad de una base de datos
	 * basada en el ID proporcionado y devuelve el número de filas afectadas o un objeto error
	 * personalizado.
	 * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
	 * entidad que necesita ser eliminada.
	 * @returns La función `deleteEntity` devuelve una `Promise` que se resuelve en un número o en un
	 * `Error personalizado`.
	 */
	public async deleteEntity(id: string): Promise<number | CustomError> {
		try {
			const result = await sequelize.transaction(async (transaccion) => {
				const whereOptions: WhereOptions = { id: id };
				const entity = await this.relation.destroy<T>({
					where: whereOptions,
					force: true,
					transaction: transaccion,
				});

				if (entity === 0) {
					return new CustomError("Entidad no encontrada", 404);
				} else {
					return entity;
				}
			});
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * La función logicDelete elimina de forma logica una entidad de una tabla de base de datos según su
	 * ID y devuelve el número de filas afectadas o un objeto de error personalizado.
	 * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
	 * entidad que necesita ser eliminada.
	 * @returns La función devuelve una `Promise` que se resuelve en un número o en un
	 * `Error personalizado`.
	 */
	public async logicDelete(id: string): Promise<number | CustomError> {
		try {
			const result = await sequelize.transaction(async (transaccion) => {
				const whereOptions: WhereOptions = { id: id };
				const entity = await this.relation.destroy<T>({
					where: whereOptions,
					transaction: transaccion,
				});

				if (entity === 0) {
					return new CustomError("Entidad no encontrada", 404);
				} else {
					return entity;
				}
			});
			return result;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}

	/**
	 * La función `restoreLogicDeleted` restaura una entidad eliminada logicamente por su ID y devuelve
	 * la entidad restaurada o un error personalizado.
	 * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
	 * entidad que necesita ser restaurada.
	 * @returns La función `restoreLogicDeleted` devuelve una Promesa que se resuelve en un instancia de
	 * tipo `T` o una instancia de `CustomError`.
	 */
	public async restoreLogicDeleted(id: string): Promise<T | CustomError> {
		try {
			await sequelize.transaction(async (transaccion) => {
				const whereOptions: WhereOptions = { id: id };

				await this.relation.restore<T>({
					where: whereOptions,
					transaction: transaccion,
				});
			});

			const entidad: T | null = await this.relation.findByPk<T>(id);

			if (entidad) {
				return entidad;
			} else {
				return new CustomError("Entidad no encontrada", 404);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				return new CustomError(error.message, 500);
			} else {
				return new CustomError("Error desconocido", 500);
			}
		}
	}
}
