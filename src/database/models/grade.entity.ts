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
import { GradeStatus } from 'src/common/enums/grade-status.enum';
import { Enrollment } from './enrollment.entity';
import { LetterGrade } from 'src/common/enums/letter-grade.enum';

@Table({
  tableName: 'grades',
  timestamps: true,
  underscored: true,
})
export class Grade extends Model<
  InferAttributes<Grade>,
  InferCreationAttributes<Grade>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    unique: true,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.ENUM(...Object.values(GradeStatus)),
    allowNull: false,
    defaultValue: GradeStatus.INCOMPLETE,
  })
  declare status: GradeStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 100,
  })
  declare totalMarks: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare obtainedMarks: number | null;

  @Column({
    type: DataType.ENUM(...Object.values(LetterGrade)),
    allowNull: true,
  })
  letterGrade?: LetterGrade;

  @ForeignKey(() => Enrollment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare enrollmentId: string;

  @BelongsTo(() => Enrollment)
  declare enrollment?: NonAttribute<Enrollment>;
}
