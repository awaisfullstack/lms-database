import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Course } from './course.entity';

@Table({
  tableName: 'reviews',
  timestamps: true,
  underscored: true,
})
export class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare comment: string | null;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare courseId: string;

  @BelongsTo(() => Course)
  declare course?: NonAttribute<Course>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare studentId: string;

  @BelongsTo(() => User)
  declare student?: NonAttribute<User>;
}
