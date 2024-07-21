import withMT from '@material-tailwind/react/utils/withMT';
export const FOOTER_HEIGHT = 32;
export const HEADER_HEIGHT = 64;

export default withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: (theme) => ({
        pageContent: `calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`,
        footer: `${FOOTER_HEIGHT}px`,
        header: `${HEADER_HEIGHT}px`,
      }),
    },
  },
  plugins: [],
});
