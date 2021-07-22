import { Table, Column, Model, PrimaryKey, NotNull } from 'sequelize-typescript';

@Table({timestamps : true})
export class User extends Model<User> {
    @Column
    @NotNull
    name : string;

    @Column
    @PrimaryKey
    @NotNull
    id : string;

    @Column
    @NotNull
    password : string;
}