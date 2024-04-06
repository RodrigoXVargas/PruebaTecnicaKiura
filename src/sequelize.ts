import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { Dialect } from "sequelize";
import * as Models from "./models/index.model";

const sequelize = new Sequelize({
	dialect: config.dialect as Dialect,
	host: config.host,
	port: config.port,
	username: config.username,
	password: config.password,
	database: config.database,
	models: [config.modelsPath],
	logging: config.logging,
});

export async function cargarBD() {
	try {
		const sequelize = await new Sequelize({
			dialect: config.dialect as Dialect,
			host: config.host,
			port: config.port,
			username: config.username,
			password: config.password,
			database: config.database,
			models: [config.modelsPath],
			logging: config.logging,
		});

		/* sequelize
			.truncate()

			.then(() => {
				console.log("Se dropean las tablas");
			})
			.catch((error: any) => {
				console.error("Error al borrar la base de datos:", error);
			}); */

		await sequelize.addModels([
			Models.Provincia,
			Models.Localidad,
			Models.Categoria,
			Models.Comentario,
			Models.CertificadoEstudio,
			Models.Direccion,
			Models.Profesional,
			Models.Usuario,
			Models.SolicitudTrabajo,
		]);

		await sequelize
			.sync({ alter: true })
			.then(() => {
				console.log("Base de datos sincronizada.");
			})
			.catch((error: any) => {
				console.error("Error al sincronizar la base de datos:", error);
			});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log("Error capturado: " + error.message);
		} else {
			console.log("Error capturado desconocido");
		}
	}
}

export default sequelize;
