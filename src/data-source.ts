import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5437,
  username: 'postgres',
  password: 'postgres',
  database: 'mealmatch',
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
});

module.exports = AppDataSource;
