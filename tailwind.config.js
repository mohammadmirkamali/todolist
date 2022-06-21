module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      purple: [],
      green: ['#1de9b6', '#79b832', 'rgb(129,178,20)', '#52c41a', '#7aaf39'],
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
        '#6c757d', // 8
        'rgb(64 52 52)',
        '#696969', // 10 next default
        '#fafafa',
        '#888', // 12 hover
        '#1a1a1a',
        '#b4b4b4',
      ],
      blue: [
        '#1890ff', // link
        '#0070f3',
        '#4285f4', // 2
        '#0077DB',
        '#00569E',
        '#C9E3F8', // 5
        '#211a58',
        '#f4f7f9', // 7
        '#2b286f;',
        '#3a4578',
        '#40a9ff', // 10
        'rgba(235, 244, 252,  0.75)',
      ],
      white: '#fff',
      black: '#000',
    },
    backgroundImage: {
      search: "url('public/logo.webp)",
    },
    border: ['1px solid #6c757d !important', '1px solid #000'],
    extend: {
      boxShadows: {
        card: '0px 20px 40px rgba(15, 24, 66, 0.1)',
        card2: '0px 3px 6px rgb(0 0 0 / 50%)',
      },
    },
  },
  plugins: [],
};
