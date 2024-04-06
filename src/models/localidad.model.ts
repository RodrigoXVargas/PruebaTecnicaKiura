import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import { Provincia } from "./provincia.model";
import { Direccion } from "./direccion.model";

@Table({
	tableName: "localidades",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
	indexes: [{ unique: true, fields: ["nombre"] }],
})
export class Localidad extends Model {
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

	@ForeignKey(() => Provincia)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_provincia!: Provincia;

	@BelongsTo(() => Provincia, "id_provincia")
	provincia!: Provincia;

	@HasMany(() => Direccion, {
		foreignKey: "id_localidad",
		hooks: true,
	})
	direcciones!: Direccion[];
}
