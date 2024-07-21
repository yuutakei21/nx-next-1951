'use client';

import Typography from '@material-tailwind/react/components/Typography';
import Link from 'next/link';
import * as React from 'react';

function Copyright() {
  return (
    <Typography variant="h2">
      {'Copyright © '}
      <Link color="inherit" href={''}>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <div className="footer h-10 flex items-center justify-center">
      <Copyright />
    </div>
  );
}

export default Footer;
