import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 20, nullable: false })
  id: string;

  @Column({ length: 200, nullable: false })
  password: string;

  @Column({ nullable: false, default: 2})
  auth_level: number;

  @Column({ nullable :true})
  refresh_token: string;
}