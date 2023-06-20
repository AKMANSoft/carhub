/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#24388A",
        "page-bg": "#00358b"
      },

    },
    backgroundImage: {
      'primary-image': "url('/images/auth_bg_image.jpg')"
    },
    backgroundPosition: {
      'primary-image': 'center',
    },
    backgroundSize: {
      'primary-image': 'cover',
    },
    fontFamily: {
      "poppins": ['Poppins', 'sans-serif']
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@headlessui/tailwindcss')
  ]
}

