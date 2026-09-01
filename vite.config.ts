import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Caminho absoluto a partir da raiz do domínio. Tem que ser "/" e não "./":
  // a página tem a rota /projetos, e com caminho relativo o navegador procuraria
  // os assets em /projetos/assets/, que não existe. Só mudar para "./" se um dia
  // o site for servido de dentro de uma subpasta.
  base: "/",
});
