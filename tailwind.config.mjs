export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        background: "#0f172a",
        surface: "#1e293b",
        success: "#22c55e",
        error: "#ef4444",
      }
    }
  },
  plugins: [],
}
