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
import { Usuario } from "./usuario.model";
import { Categoria } from "./categoria.model";
import { CertificadoEstudio } from "./certificadoEstudio.model";
import { Comentario } from "./comentario.model";

@Table({
	tableName: "profesionales",
	timestamps: true,
	paranoid: true,
	deletedAt: "deletionDate",
	indexes: [{ unique: true, fields: ["dni"] }],
})
export class Profesional extends Model {
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
		allowNull: true,
	})
	dni!: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	perfilImage!: string;

	@Column({
		type: DataType.DECIMAL,
		defaultValue: 0,
		validate: {
			min: 0,
			max: 5,
		},
	})
	califGeneral!: number;

	@ForeignKey(() => Categoria)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
	id_categoria?: string | null;

	@BelongsTo(() => Categoria)
	categoria?: Categoria | null;

	@ForeignKey(() => Usuario)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	id_usuario!: string;

	@BelongsTo(() => Usuario, {
		foreignKey: "id_usuario",
		onDelete: "cascade",
		hooks: true,
	})
	usuario?: Usuario;

	@HasMany(() => CertificadoEstudio, "id_profesional")
	certificados!: CertificadoEstudio[];

	@HasMany(() => Comentario, "id_profesional")
	comentarios!: Comentario[];
}
