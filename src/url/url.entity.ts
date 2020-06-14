import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    Unique,
    Length,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({
    tableName: 'url',
})
export class Url extends Model<Url> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        field: 'user_id',
    })
    userId: string;

    @Length({
        min: 3,
        max: 100,
        msg: `A url deve conter no mínimo 3 e no máximo 100 caracteres`,
    })
    @Column
    url: string;

    @Length({
        min: 5,
        max: 10,
        msg: `A url deve conter no mínimo 5 e no máximo 10 caracteres`,
    })
    @Column
    newurl: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;

    @BelongsTo(() => User)
    user: User;
}
