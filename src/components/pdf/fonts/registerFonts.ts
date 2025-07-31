import { Font } from '@react-pdf/renderer';

// Register DM Sans font family with all variants using reliable CDN URLs
Font.register({
  family: 'DM Sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHQ.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/dmsans/v11/rP2Cp2ywxg089UriAWCrCBamC2QX.woff2',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.gstatic.com/s/dmsans/v11/rP2Bp2ywxg089UriCZOIHTWEBlwu8Q.woff2',
      fontWeight: 500,
    },
    {
      src: 'https://fonts.gstatic.com/s/dmsans/v11/rP2Ap2ywxg089UriCZOIHTWEBlwu8XIJ.woff2',
      fontWeight: 600,
    },
  ]
});

// Export a function to ensure fonts are registered
export const ensureFontsRegistered = () => {
  // This function ensures the font registration code above has executed
  return true;
};
