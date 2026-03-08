/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // tous tes fichiers source React
  ],
  darkMode: "media", // ou "media" si tu veux détecter le dark mode du système
  theme: {
    extend: {
      colors: {
        primary: "#8839ef",
        secondary: "#1e66f5",
        danger: "#d20f39",
        warning: "#df8e1d",
        success: "#40a02b",
      },
      boxShadow: {
        primary: "0 2px 12px 0 rgba(136,57,239,0.25)",
        secondary: "0 2px 12px 0 rgba(30,102,245,0.22)",
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
      },
    },
  },
  plugins: [],
};
