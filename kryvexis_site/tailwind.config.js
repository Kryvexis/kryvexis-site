/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kx: {
          bg: "#07090d",
          blue: "#12A1EE",
          cyan: "#22d3ee",
          purple: "#a78bfa"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.10), 0 22px 96px rgba(0,0,0,0.62)",
        soft: "0 10px 44px rgba(0,0,0,0.48)"
      },
      keyframes: {
        floaty: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { transform: "translateX(-60%)" }, "100%": { transform: "translateX(160%)" } },
        aurora: {
          "0%": { transform: "translate3d(-20%, -10%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(10%, 10%, 0) rotate(12deg)" },
          "100%": { transform: "translate3d(-20%, -10%, 0) rotate(0deg)" }
        },
        sweep: { "0%": { transform: "translateX(-120%) skewX(-18deg)" }, "100%": { transform: "translateX(180%) skewX(-18deg)" } }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        sweep: "sweep 1.2s ease-in-out 0.35s 1"
      }
    },
  },
  plugins: []
}
