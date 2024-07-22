"use client";

// import Typography from '@material-tailwind/react/components/Typography';
// import Link from 'next/link';
// import * as React from 'react';

// function Copyright() {
//   return (
//     <Typography>
//       {'Copyright © '}
//       <Link color="inherit" href={''}>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// function Footer() {
//   return (
//     <div className={`footer h-footer flex items-center justify-center`}>
//       <Copyright />
//     </div>
//   );
// }

function Footer() {
  return (
    <footer className="footer footer-center  w-full p-2 bg-gray-300 text-gray-800">
      <div className="text-center">
        <p>
          Copyright © {new Date().getFullYear()} -
          <a className="font-semibold" href="user@example.com">
            Yuu
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
