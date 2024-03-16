import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { loadEnv } from 'vite'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

    return defineConfig({
        plugins:
        [
            react()
        ],
        root: 'src/',
        publicDir: "../public/",
        base: './',
        server:
        {
            host: true,
            open: !isCodeSandbox // Open if it's not a CodeSandbox
        },
        build:
        {
            outDir: '../dist',
            emptyOutDir: true,
            sourcemap: true
        }
    })
}
