module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
      colors: {
        "brand-color": "#F73668",
        "brand-text-color": "#FFF",
        "spotify-green": "#1DB954",
      },
      dropShadow: {
        "bg": "0 0 5px rgba(0,0,0,0.25)"
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}