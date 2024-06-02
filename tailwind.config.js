export default {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        car2: "url('./src/shared/assets/car-2.jpg')",
      },
    },
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};
