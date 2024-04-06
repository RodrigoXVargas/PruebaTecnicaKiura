import { Request } from "express";
//import { JwtPayload } from "jsonwebtoken";

export class CustomError extends Error {
	message: string;
	codigo: number;

	constructor(message: string, codigo: number) {
		super(), (this.message = message), (this.codigo = codigo);
	}
}

export interface RequestExt extends Request {
	usuarioId?: string /* | JwtPayload */;
}

export interface UsuarioDTO {
	id?: string;
	nombre: string;
	apellido: string;
	email: string;
	password: string;
	rol?: string;
	telefono: number;
	activo?: boolean;
	id_direccion?: DireccionDTO;
}

export interface UsuarioProfDTO {
	id?: string;
	nombre: string;
	apellido: string;
	email: string;
	password: string;
	rol?: string;
	telefono: number;
	activo?: boolean;
	id_direccion?: DireccionDTO;
	dni: number;
	califGeneral: number;
	id_categoria: string;
}

export interface ProfesionalDTO {
	dni: string;
	califGeneral: number;
	id_categoria: string;
	id_usuario: UsuarioDTO;
}

export interface DireccionDTO {
	id?: string;
	calle: string;
	numeracion: number;
	piso: number;
	codigoPostal: number;
	urlUbicacion: string;
	id_localidad: string;
	id_provincia: string;
	id_usuario: string;
}

export interface LocalidadDTO {
	id?: string;
	nombre: string;
	id_provincia: ProfesionalDTO;
}

export interface ProvinciaDTO {
	id?: string;
	nombre: string;
}

export interface SolicitudTrabajoDTO {
	id?: string;
	descripcion: string;
	estado: string;
	presupuesto: number;
	id_profesional: string;
	id_usuario: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface ComentarioDTO {
	comentario: string;
	calificacion: number;
	id_profesional: string;
}

export interface CategoriaDTO {
	id?: string;
	nombre: string;
}

export interface CertificadoEstudioDTO {
	id?: string;
	titulo: string;
	institucion: string;
	id_profesional: string;
}
