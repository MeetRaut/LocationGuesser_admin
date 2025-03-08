import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react()
  ],
  server: {
    host: '0.0.0.0',  // Make the server accessible from any device on the network
    port: 5173,        // Keep the same port or change if needed
  }
});
