import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	BelongsTo,
	ForeignKey,
} from "sequelize-typescript";
import { Profesional } from "./profesional.model";
import { Usuario } from "./usuario.model";

@Table({
	tableName: "solicitudes_trabajo",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
})
export class SolicitudTrabajo extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		unique: true,
	})
	id!: string;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	descripcion!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	estado!: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
	})
	presupuesto!: number;

	@ForeignKey(() => Profesional)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_profesional!: string;

	@BelongsTo(() => Profesional)
	profesional!: Profesional;

	@ForeignKey(() => Usuario)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_usuario!: string;

	@BelongsTo(() => Usuario)
	usuario!: Usuario;
}
