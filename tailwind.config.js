/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kx: {
          bg: "#07090d",
          card: "rgba(255,255,255,0.06)",
          line: "rgba(255,255,255,0.12)",
          text: "rgba(255,255,255,0.92)",
          mut: "rgba(255,255,255,0.70)",
          silver: "#F8F8F8",
          green: "#12A1EE",
          lime: "#84cc16",
          cyan: "#00D2FF",
          purple: "#6D6DFF"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.10), 0 20px 80px rgba(0,0,0,0.55)",
        soft: "0 10px 40px rgba(0,0,0,0.45)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-60%)" },
          "100%": { transform: "translateX(160%)" }
        },
        aurora: {
          "0%": { transform: "translate3d(-20%, -10%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(10%, 10%, 0) rotate(12deg)" },
          "100%": { transform: "translate3d(-20%, -10%, 0) rotate(0deg)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite"
      }
    },
  },
  plugins: []
}
