const { plugin } = require("twrnc");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        "text-h1": `font-black text-2xl`,
        "text-h2": `font-bold text-base`,
      });
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        black: ["black"],
        bold: ["bold"],
        light: ["light"],
        regular: ["regular"],
        thin: ["thin"],
        medium: ["medium"],
      },
      colors: {
        // background: "rgba(225, 231, 253, 1)",
        // foreground: "rgba(50, 48, 126, 1)",
        primary: "rgba(87, 92, 206, 1)",
        ["primary-foreground"]: "white",
        // secondary: "rgba(209, 171, 88, 1)",
        // ["secondary-foreground"]: "rgba(58, 58, 130, 1)",
        // card: "rgba(168, 180, 247, 1)",
        // ["card-foreground"]: "rgba(48, 46, 124, 1)",

        card: "black",
        muted: "rgba(164, 169, 173, 1)",
        // dark: {
        background: "rgba(32, 33, 36, 1)",
        secondary: "rgba(66, 66, 66, 1)",
        foreground: "white",
        // },
      },
    },
  },
};
