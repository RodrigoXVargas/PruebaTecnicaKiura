import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Localidad } from "./localidad.model";

@Table({
	tableName: "direcciones",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
})
export class Direccion extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		unique: true,
	})
	id!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	codigoPostal!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	calle!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	numeracion!: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	piso!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	observaciones!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	urlUbicacion!: string;

	@ForeignKey(() => Localidad)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_localidad!: Localidad;

	@BelongsTo(() => Localidad)
	localidad!: Localidad;

	@ForeignKey(() => Usuario)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
	id_usuario?: string;

	@BelongsTo(() => Usuario, {
		onDelete: "Cascade",
		hooks: true,
	})
	usuario?: Usuario;
}
