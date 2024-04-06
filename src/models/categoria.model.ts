import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
} from "sequelize-typescript";

@Table({
	tableName: "categorias",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
	indexes: [{ unique: true, fields: ["nombre"] }],
})
export class Categoria extends Model {
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
}
