import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"

export default defineConfig({
  input: "./sources/index.ts",
  external: [
    "path"
  ],
  plugins: [
    typescript()
  ],
  output: {
    file: "./build/index.js",
    format: "cjs"
  }
})
