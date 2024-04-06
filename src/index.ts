import "dotenv/config";
import express from "express";
import cors from "cors";
import { cargarBD } from "./sequelize";

import * as Routes from "./routes/index.model";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

const iniciarServidor = async () => {
	await cargarBD();

	const apiV1Router = express.Router();

	app.use("/api/v1", apiV1Router);

	apiV1Router.use("/categorias", Routes.categoriaRouter());
	apiV1Router.use("/certEstudios", Routes.certificadoEstudioRouter());
	apiV1Router.use("/comentarios", Routes.comentarioRouter());
	apiV1Router.use("/direcciones", Routes.direccionRouter());
	apiV1Router.use("/localidades", Routes.localidadRouter());
	apiV1Router.use("/profesionales", Routes.profesionalRouter());
	apiV1Router.use("/provincias", Routes.provinciaRouter());
	apiV1Router.use("/solTrabajos", Routes.solicitudTrabajoRouter());
	apiV1Router.use("/usuarios", Routes.usuarioRouter());
	apiV1Router.use("/auth", Routes.authRouter());

	const PORT = process.env.PORT ?? 1234;

	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
};

iniciarServidor().catch((error) => {
	console.error("Error al iniciar el servidor", error);
});
