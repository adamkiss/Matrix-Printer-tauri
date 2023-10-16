import { defineConfig } from "vite";

export default defineConfig({
    root: "./src",
    // prevent obscuring Rust errors
    clearScreen: false,
    // Fixed port for tauri
    server: {
        port: 6969,
        strictPort: true,
    },
    // Other Tauri stuff
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        target: ["es2021", "chrome100", "safari14"],
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    }
})