import withMT from '@material-tailwind/react/utils/withMT';
const FOOTER_HEIGHT = 40;
const HEADER_HEIGHT = 48;
const MOBILE_HEADER_HEIGHT = 56;

const config = withMT({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        toastIn: 'toastIn .8s both',
        toastOut: 'toastOut .8s both',
      },
      keyframes: {
        toastIn: {
          '0%': {
            transform: 'var(--elm-translate) scale(0.7)',
            opacity: 0.7,
          },
          '80%': { transform: 'translate(0px) scale(0.7)', opacity: 0.7 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        toastOut: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '20%': { transform: 'translate(0px) scale(0.7)', opacity: 0.7 },
          '100%': {
            transform: 'var(--elm-translate) scale(0.7)',
            opacity: 0.7,
          },
        },
      },
      maxHeight: {
        pageContent: `calc(100vh - ${HEADER_HEIGHT}px)`,
      },
      minHeight: {
        pageContent: `calc(100vh - ${HEADER_HEIGHT}px)`,
        // pageContent: `calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`,
        mobilePageContent: `calc(100vh - ${
          FOOTER_HEIGHT + MOBILE_HEADER_HEIGHT
        }px)`,
        footer: `${FOOTER_HEIGHT}px`,
        header: `${HEADER_HEIGHT}px`,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
});
export default config;
