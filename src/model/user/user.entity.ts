import { Entity, Column, PrimaryColumn} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryColumn({ length: 20, nullable: false })
  id: string;

  @Column({ length: 200, nullable: false })
  password: string;

  @Column({ length: 10, nullable: false })
  name: string;

  @Column({ nullable: false, default: 2})
  auth_level: number;

  @Column({ nullable :true})
  @Exclude()
  refresh_token?: string;
}