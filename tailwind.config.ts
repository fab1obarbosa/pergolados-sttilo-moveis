import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noite: "#0A1330",
        oficina: "#102A63",
        serragem: "#F2EEE7",
        carvao: "#111111",
        laranja: "#E85D24",
        "laranja-claro": "#F4A256",
        tinta: "#0E1A33",
        "tinta-fraca": "#55607A",
        "claro-fraco": "#AEBBD6",
      },
      fontFamily: {
        display: ["Barlow Condensed", "Arial Narrow", "Arial", "sans-serif"],
        body: ["Poppins", "Segoe UI", "Arial", "sans-serif"],
      },
      // raio mínimo: o projeto é de marcenaria, canto vivo é a linguagem
      borderRadius: {
        none: "0",
        DEFAULT: "2px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        full: "999px",
      },
      transitionTimingFunction: {
        exp: "cubic-bezier(0.16,1,0.3,1)",
        quart: "cubic-bezier(0.25,1,0.5,1)",
      },
      zIndex: {
        fundo: "0",
        conteudo: "10",
        header: "80",
        topo: "90",
      },
      keyframes: {
        "corre-esq": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "luz-varre": {
          "0%,100%": { transform: "translateX(-14%)", opacity: "0.75" },
          "50%": { transform: "translateX(14%)", opacity: "1" },
        },
        "pulso-pino": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "70%,100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        "corre-esq": "corre-esq 46s linear infinite",
        "pulso-pino": "pulso-pino 2.8s ease-out infinite",
        "luz-varre": "luz-varre 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
