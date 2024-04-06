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

@Table({
	tableName: "certificado_estudio",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
})
export class CertificadoEstudio extends Model {
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
	titulo!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	institucion!: string;

	@ForeignKey(() => Profesional)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_profesional!: string;

	@BelongsTo(() => Profesional, "certificados")
	profesional!: Profesional;
}
