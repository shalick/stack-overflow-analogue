import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_CODELANG_API_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on("proxyRes", (_proxyRes, _req, res) => {
              res.setHeader("Access-Control-Allow-Credentials", "true");
            });
          },
        },
      },
    },
  };
});
