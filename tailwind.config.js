module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                soopgreen: '#1DB954',
                soopgray: '#F5F5F7',
                soopborder: '#E5E5E5',
                sooptext: '#222',
                soopblue: '#3B82F6',
                soopred: '#F87171',
            },
            borderRadius: {
                card: '1.25rem',
                btn: '9999px',
            },
            boxShadow: {
                card: '0 2px 16px 0 rgba(0,0,0,0.06)',
                btn: '0 1px 4px 0 rgba(29,185,84,0.15)',
            },
        },
    },
    plugins: [],
};
