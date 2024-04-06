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
	tableName: "comentarios",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
})
export class Comentario extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		unique: true,
	})
	id!: string;

	@Column({
		type: DataType.DOUBLE,
		defaultValue: 0,
		validate: {
			min: 0,
			max: 5,
		},
	})
	calificacion!: number;

	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	comentario!: string;

	@ForeignKey(() => Profesional)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_profesional!: string;

	@BelongsTo(() => Profesional, {
		onDelete: "Cascade",
		hooks: true,
	})
	profesional!: Profesional;
}
