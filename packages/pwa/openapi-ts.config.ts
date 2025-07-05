import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://localhost:8787/api/swagger.json',
  output: 'src/apis',
  plugins: ['@hey-api/client-axios'],
})
