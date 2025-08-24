import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        devServer({
            entry: 'src/server.tsx',
        })
    ],
    build: {
        cssCodeSplit: true
    }
})