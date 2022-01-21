module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      purple: [],
      green: ['#1de9b6'],
      red: ['#E53935'],
      yellow: [],
      gray: [
        '#f2f2f2',
        'rgba(0, 0, 0, 0.1)',
        'rgba(0, 0, 0, 0.4)', // 2
        '#918dae',
        '#f0f0f0',
        '#dee2e6', // 5,
        'rgb(165, 166, 172)',
        'rgba(0,0,0,0.5)',
      ],
      blue: ['#1890ff', '#0070f3', '#4285f4'],
      white: '#fff',
      black: '#000',
    },
    backgroundImage: {
      search: "url('public/logo.webp)",
    },
    border: [],
    shadows: [],
  },
  plugins: [],
};
