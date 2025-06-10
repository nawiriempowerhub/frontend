// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // If your main HTML is in the root
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in src and its subfolders
    // Add other paths if you have them, e.g., for components outside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}