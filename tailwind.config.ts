import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4E2B63",
        secondary: "#595959",
        teratery: "#F5F5F5",
        subTitle: "#7E7E7E",
        bg: "#F5F5F5",
        bgHero: "#EDEEED",
        nav: "#D3D3D3",
        fooHeader: "#bc560a",
        "button-start": "#5e3429",
        "button-end": "#a5623a",
        "hero-shadow-start": "#fbd24e",
        "hero-shadow-end": "#f49d0c",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
