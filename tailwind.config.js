/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      fontSize: {
        'h1': '1.7rem', // Customize the size of the h1 tag
      },
      fontWeight: {
        'h1': '700', // Customize the font-weight of the h1 tag
      },
      colors: {
        'h1': '#886345', // Customize the color of the h1 tag
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
  ],
}

