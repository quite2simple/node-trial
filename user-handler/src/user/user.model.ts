import { Column, Model, Table} from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  age: number;

  @Column
  sex: string;

  @Column
  problems: boolean;

}
