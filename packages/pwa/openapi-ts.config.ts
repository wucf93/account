import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://localhost:8787/openapi.json',
  output: 'src/apis',
  plugins: ['@hey-api/client-axios'],
})
