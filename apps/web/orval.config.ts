// orval.config.ts
import dotenv from 'dotenv'

dotenv.config()

export default {
  api: {
    // eslint-disable-next-line node/prefer-global/process
    input: `${process.env.VITE_API_URL}/doc`,
    output: {
      mode: 'tags-split',
      target: './src/api/generated.ts',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: './src/api/fetcher.ts',
          name: 'customFetch',
        },
      },
    },
  },
}
