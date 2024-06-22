module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1e3a8a", // Warna biru tua
        "light-blue": "#3b82f6", // Warna biru terang saat hover
      },
      backgroundImage: {
        "custom-bg": "url('/public/img/bg-image.png')",
      },
    },
  },
  plugins: [],
};
