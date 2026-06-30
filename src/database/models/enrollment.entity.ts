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
import { Course } from './course.entity';
import { EnrollmentStatus } from 'src/common/enums/enrollment-status.enum';
import { Grade } from './grade.entity';

@Table({
  tableName: 'enrollments',
  timestamps: true,
  underscored: true,
})
export class Enrollment extends Model<
  InferAttributes<Enrollment>,
  InferCreationAttributes<Enrollment>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.ENUM(...Object.values(EnrollmentStatus)),
    allowNull: false,
    defaultValue: EnrollmentStatus.ACTIVE,
  })
  declare status: EnrollmentStatus;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare courseId: string;

  @BelongsTo(() => Course, 'courseId')
  declare course?: NonAttribute<Course>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare studentId: string;

  @BelongsTo(() => User, 'studentId')
  declare student?: NonAttribute<User>;

  @HasMany(() => Grade)
  declare grades: NonAttribute<Grade[]>;
}
