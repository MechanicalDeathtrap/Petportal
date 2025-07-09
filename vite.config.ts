import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
	    base: '/',
	    host: '0.0.0.0',
	allowedHosts: [
      'pet-projects.online',
      'www.pet-projects.online'
    ],
    /*https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },*/
    port: 5173,
  plugins: [react()
  ]
    }
});
