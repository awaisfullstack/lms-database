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
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Enrollment } from './enrollment.entity';
import { Review } from './reviews.entity';
import { Module } from './module.entity';
import { Assignment } from './assignment.entity';

@Table({
  tableName: 'courses',
  timestamps: true,
  underscored: true,
})
export class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    },
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      len: [0, 5000],
    },
  })
  declare description: string | null;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare createdBy: string;

  @BelongsTo(() => User, 'createdBy')
  declare user?: NonAttribute<User>;

  @HasMany(() => Enrollment)
  declare enrollments: NonAttribute<Enrollment[]>;

  @HasMany(() => Review)
  declare reviews: NonAttribute<Review[]>;

  @HasMany(() => Module)
  declare modules: NonAttribute<Module[]>;

  @HasMany(() => Assignment)
  declare assignments: NonAttribute<Assignment[]>;
}
