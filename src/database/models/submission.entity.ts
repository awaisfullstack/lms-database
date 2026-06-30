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
import { Assignment } from './assignment.entity';
import { User } from './user.entity';
import { SubmissionStatus } from 'src/common/enums/submission-status.enum';

@Table({
  tableName: 'submissions',
  timestamps: true,
  underscored: true,
})
export class Submission extends Model<
  InferAttributes<Submission>,
  InferCreationAttributes<Submission>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.ENUM(...Object.values(SubmissionStatus)),
    allowNull: false,
    defaultValue: SubmissionStatus.SUBMITTED,
  })
  declare status: SubmissionStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  })
  declare score: CreationOptional<number | null>;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare assignmentId: string;

  @BelongsTo(() => Assignment, 'assignmentId')
  declare assignment?: NonAttribute<Assignment>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare studentId: string;

  @BelongsTo(() => User, 'studentId')
  declare student?: NonAttribute<User>;
}
