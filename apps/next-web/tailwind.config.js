import withMT from '@material-tailwind/react/utils/withMT';
export const FOOTER_HEIGHT = 56;
export const HEADER_HEIGHT = 72;
export const MOBILE_HEADER_HEIGHT = 56;

export default withMT({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      minHeight: (theme) => ({
        pageContent: `calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`,
        mobilePageContent: `calc(100vh - ${
          FOOTER_HEIGHT + MOBILE_HEADER_HEIGHT
        }px)`,
        footer: `${FOOTER_HEIGHT}px`,
        header: `${HEADER_HEIGHT}px`,
      }),
    },
  },
  plugins: [],
});
