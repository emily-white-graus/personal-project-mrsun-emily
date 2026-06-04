// eslint.config.js
import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  globalIgnores(["coverage/", "dist/", "web-build/", "metro.config.js"]),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  config,
  {
    // configs overrides, if need
  },
)
