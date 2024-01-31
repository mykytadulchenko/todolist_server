import { configDotenv } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

configDotenv()

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'], // [User, Item, Jwt],
  migrations: ['dist/migrations/*.js'],
  // synchronize: true
}

const dataSource = new DataSource(config)
export default dataSource
