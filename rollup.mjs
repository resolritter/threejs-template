import resolve from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import { dirname, join as joinPath } from "path"
import { fileURLToPath } from "url"

const projectRoot = dirname(fileURLToPath(import.meta.url))
const outputFile = joinPath(projectRoot, "build", "bundle.js")

export default {
  input: "scene.js",
  output: [{ format: "umd", file: outputFile }],
  plugins: [resolve(), serve(), livereload({ watch: [outputFile] })],
}
