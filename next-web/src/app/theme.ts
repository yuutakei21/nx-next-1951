export const materialTheme = {
  button: {
    defaultProps: {
      color: 'primary',
    },
    valid: {
      colors: ['primary'],
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: 'bg-red-500',
            color: 'text-white',
          },
        },
        outlined: {
          primary: {
            border: 'border border-primary',
            color: 'text-primary',
          },
        },
        gradient: {
          primary: {
            background: 'bg-primary',
            color: 'text-white',
          },
        },
        text: {
          primary: {
            color: 'text-primary',
          },
        },
      },
    },
  },
};
