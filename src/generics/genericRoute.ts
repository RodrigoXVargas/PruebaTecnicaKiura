import { Router } from "express";
//import { GenericController } from "./genericController";
import { Model } from "sequelize-typescript";
import z from "zod";

/**
 * La función `genericRoutes` crea un enrutador genérico con rutas CRUD comunes para un modelo y esquema
 * determinado
 * @param modelo - El parámetro `modelo` es un tipo genérico que extiende la clase `Model` y la interfaz
 * K`, definido asi por sequelize. Representa la clase de modelo que se utilizará en las rutas genéricas.
 * @param schema - El parámetro `schema` es un esquema de validación definido utilizando la biblioteca
 * `zod`. Se utiliza para validar el cuerpo de la solicitud al crear o actualizar una instancia de modelo.
 * @returns un enrutador genérico que contiene las rutas para las operaciones CRUD en un modelo genérico.
 */
export const genericRoutes = <T extends Model<T> & K, K>(
	modelo: { new (): T } & typeof Model,
	schema: z.AnyZodObject
) => {
	/* `const genericRouter = Router()` está creando una nueva instancia de Express Router. La función 
    `Router()` es una función incorporada en el marco Express que crea un nuevo objeto enrutador. 
    Este objeto de enrutador se puede utilizar para definir rutas y manejar solicitudes HTTP para 
    un determinado ruta o punto final. En este caso, se utiliza para definir las rutas para las operaciones CRUD en un modelo genérico. */
	const genericRouter = Router();

	/* La línea `const genericController = new GenericController(modelo)` está creando una nueva instancia
    de la clase `GenericController`. La clase `GenericController` es responsable de manejar las 
    Operaciones CRUD para cualquier modelo que se pase por parametro. Pasando el parámetro `modelo` al 
    constructor de `GenericController`, estamos creando una instancia de controlador que es específica 
    del archivo modelo proporcionado. Esto nos permite reutilizar la misma lógica de controlador para
    diferentes modelos de forma genérica. */
	//const genericController = new GenericController(modelo, schema);

	/* Estas líneas de código definen las rutas para las operaciones CRUD en un modelo genérico. 
    Cada ruta corresponde a una operación específica:*/
	/*
	genericRouter.get(
		"/",
		(req, res) => genericController.getAll(req, res)
	);
	genericRouter.get("/getAllDeleted/", (req, res) =>
		genericController.getAllDeleted(req, res)
	);
	genericRouter.get("/getById/:id", (req, res) =>
		genericController.getById(req, res)
	);
	genericRouter.post("/", (req, res) => genericController.create(req, res));
	genericRouter.patch("/:id", (req, res) => genericController.update(req, res));
	genericRouter.delete("/:id", (req, res) =>
		genericController.delete(req, res)
	);
	genericRouter.delete("/logicDelete/:id", (req, res) =>
		genericController.logicDelete(req, res)
	);
	genericRouter.patch("/restore/:id", (req, res) =>
		genericController.restoreLogicDeleted(req, res)
	);
		*/
	/* La declaración `return genericRouter` devuelve el objeto de enrutador creado. Esto permite que el
    enrutador que se utilice y monte en el archivo principal de la aplicación Express o en cualquier otro
    archivo donde se encuentre necesario. */
	return genericRouter;
};
