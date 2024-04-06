import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	HasOne,
} from "sequelize-typescript";
import { Direccion } from "./direccion.model";
import { Roles } from "../enums/rol";
import { Profesional } from "./profesional.model";

@Table({
	tableName: "usuarios",
	timestamps: true,
	paranoid: true,
	indexes: [{ unique: true, fields: ["email"] }],
})
export class Usuario extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		unique: true,
	})
	id!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	nombre!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	apellido!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	email!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: Roles.USUARIO,
	})
	rol!: string;

	@Column({
		type: DataType.BIGINT,
		allowNull: false,
	})
	telefono!: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	activo!: boolean;

	@HasOne(() => Direccion, {
		foreignKey: "id_usuario",
		onDelete: "cascade",
		hooks: true,
	})
	id_direccion?: Direccion | null;

	@HasOne(() => Profesional, {
		foreignKey: "id_usuario",
		onDelete: "cascade",
		hooks: true,
	})
	id_profesional?: Profesional | null;
}
