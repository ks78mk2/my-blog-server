module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'myBlog',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};