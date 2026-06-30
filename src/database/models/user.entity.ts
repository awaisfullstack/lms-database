import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/common/enums/role.enum';
import { Enrollment } from './enrollment.entity';
import { Submission } from './submission.entity';
import { Review } from './reviews.entity';
import { Course } from './course.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  })
  declare name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
  })
  declare password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
    defaultValue: Role.STUDENT,
  })
  declare role: CreationOptional<Role>;

  @HasMany(() => Enrollment, {
    foreignKey: 'student_id',
    as: 'enrollments',
  })
  declare enrollments: NonAttribute<Enrollment[]>;

  @HasMany(() => Submission, {
    foreignKey: 'student_id',
    as: 'submissions',
  })
  declare submissions: NonAttribute<Submission[]>;

  @HasMany(() => Review, {
    foreignKey: 'student_id',
    as: 'reviews',
  })
  declare reviews: NonAttribute<Review[]>;

  @HasMany(() => Course, {
    foreignKey: 'created_by',
    as: 'createdCourses',
  })
  declare createdCourses: NonAttribute<Course[]>;
}
