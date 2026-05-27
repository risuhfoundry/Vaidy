const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-void": "#050508",
        surface: "#0e0e14",
        glass: "#ffffff08",
        border: "#ffffff12",
        emerald: {
          400: "#34d399",
        },
        teal: {
          300: "#5eead4",
        },
        indigo: {
          400: "#818cf8",
        },
      },
      fontSize: {
        "display-xl": ["clamp(3.75rem, 9vw, 8rem)", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        display: "-0.045em",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        35: "0.35",
        55: "0.55",
        85: "0.85",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", boxShadow: "0 0 0 0 rgba(52, 211, 153, 0.45)" },
          "50%": { opacity: "1", boxShadow: "0 0 24px 4px rgba(52, 211, 153, 0.45)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-220% center" },
          "100%": { backgroundPosition: "220% center" },
        },
        wave: {
          "0%, 100%": { transform: "scaleX(1) scaleY(1)" },
          "35%": { transform: "scaleX(1.04) scaleY(0.98)" },
          "70%": { transform: "scaleX(0.98) scaleY(1.04)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        wave: "wave 7s ease-in-out infinite",
      },
    },
  },
};

export default config;
