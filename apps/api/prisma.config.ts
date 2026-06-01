import { defineConfig } from 'prisma/config'
import { config } from './src/infrastructure/config/config'

export default defineConfig({
	schema: 'src/infrastructure/database/schema.prisma',
	migrations: {
		path: 'src/infrastructure/database/migrations',
	},
	datasource: {
		url: config.DATABASE_URL,
	},
})
