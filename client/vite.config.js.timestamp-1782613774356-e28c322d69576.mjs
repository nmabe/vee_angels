// vite.config.js
import path from "path";
import { defineConfig } from "file:///Users/nmabe/Developer/vee_angels/client/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nmabe/Developer/vee_angels/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/nmabe/Developer/vee_angels/client";
var vite_config_default = defineConfig(({ command, mode, isSsrBuild }) => {
  return {
    define: {
      "process.env": {}
    },
    base: command === "serve" ? "/" : "./",
    build: {
      minify: !isSsrBuild,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        },
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173
      }
    },
    ssr: isSsrBuild ? {
      target: "node",
      // Force Vite to resolve react-router correctly on the server side
      noExternal: ["react-helmet-async"],
      external: [
        "react",
        "react-dom",
        "react-router",
        "react-router-dom",
        "react-redux",
        "@reduxjs/toolkit"
      ]
    } : {}
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbm1hYmUvRGV2ZWxvcGVyL3ZlZV9hbmdlbHMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbm1hYmUvRGV2ZWxvcGVyL3ZlZV9hbmdlbHMvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ubWFiZS9EZXZlbG9wZXIvdmVlX2FuZ2Vscy9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSwgaXNTc3JCdWlsZCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmaW5lOiB7XG4gICAgICAncHJvY2Vzcy5lbnYnOiB7fVxuICAgIH0sXG4gICAgYmFzZTogY29tbWFuZCA9PT0gJ3NlcnZlJyA/ICcvJyA6ICcuLycsXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogIWlzU3NyQnVpbGQsXG4gICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZFxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV1cbiAgICAgICAgICAgICAgICAuc3BsaXQoJy8nKVswXVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbndhcm4od2FybmluZywgd2Fybikge1xuICAgICAgICAgIC8vIFN1cHByZXNzIFwiTW9kdWxlIGxldmVsIGRpcmVjdGl2ZXMgY2F1c2UgZXJyb3JzIHdoZW4gYnVuZGxlZFwiIHdhcm5pbmdzXG4gICAgICAgICAgaWYgKHdhcm5pbmcuY29kZSA9PT0gJ01PRFVMRV9MRVZFTF9ESVJFQ1RJVkUnKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTGV0IFJvbGx1cCBoYW5kbGUgYWxsIG90aGVyIG5vcm1hbCB3YXJuaW5nc1xuICAgICAgICAgIHdhcm4od2FybmluZylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogNTE3MyxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICBobXI6IHtcbiAgICAgICAgcG9ydDogNTE3M1xuICAgICAgfVxuICAgIH0sXG4gICAgc3NyOiBpc1NzckJ1aWxkID8ge1xuICAgICAgdGFyZ2V0OiAnbm9kZScsXG4gICAgICAvLyBGb3JjZSBWaXRlIHRvIHJlc29sdmUgcmVhY3Qtcm91dGVyIGNvcnJlY3RseSBvbiB0aGUgc2VydmVyIHNpZGVcbiAgICAgIG5vRXh0ZXJuYWw6IFsncmVhY3QtaGVsbWV0LWFzeW5jJ10sIFxuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAgICdyZWFjdC1yb3V0ZXInLCBcbiAgICAgICAgJ3JlYWN0LXJvdXRlci1kb20nLFxuICAgICAgICAncmVhY3QtcmVkdXgnLFxuICAgICAgICAnQHJlZHV4anMvdG9vbGtpdCdcbiAgICAgIF1cbiAgICB9IDoge31cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsT0FBTyxVQUFVO0FBQzNULFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUZsQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsTUFBTSxXQUFXLE1BQU07QUFDN0QsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sZUFBZSxDQUFDO0FBQUEsSUFDbEI7QUFBQSxJQUNBLE1BQU0sWUFBWSxVQUFVLE1BQU07QUFBQSxJQUNsQyxPQUFPO0FBQUEsTUFDTCxRQUFRLENBQUM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IscUJBQU8sR0FDSixTQUFTLEVBQ1QsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUN4QixNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQ1osU0FBUztBQUFBLFlBQ2Q7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsT0FBTyxTQUFTLE1BQU07QUFFcEIsY0FBSSxRQUFRLFNBQVMsMEJBQTBCO0FBQzdDO0FBQUEsVUFDRjtBQUVBLGVBQUssT0FBTztBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLEtBQUs7QUFBQSxRQUNILE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSyxhQUFhO0FBQUEsTUFDaEIsUUFBUTtBQUFBO0FBQUEsTUFFUixZQUFZLENBQUMsb0JBQW9CO0FBQUEsTUFDakMsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLElBQUksQ0FBQztBQUFBLEVBQ1A7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
