module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              'margin': '0px'
            },
            h2: {
              'margin': '0px'
            },
            p: {
              'margin-top': '1em',
              'margin-bottom': '1em'
            }
          }
        }
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
