import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	HasMany,
} from "sequelize-typescript";
import { Localidad } from "./localidad.model";

@Table({
	tableName: "provincias",
	paranoid: true,
	deletedAt: "deletionDate",
	indexes: [{ unique: true, fields: ["nombre"] }],
})
export class Provincia extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		unique: true,
	})
	id?: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	nombre!: string;

	@HasMany(() => Localidad, {
		foreignKey: "id_provincia",
		hooks: true,
	})
	localidades!: Localidad[];
}
