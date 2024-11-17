// import { Inter } from 'next/font/google';
 
// export const inter = Inter({ subsets: ['latin'] });

// //试试加一个字体

// export const lus = Inter({ subsets: ['Lusitana'] });

//加的字体

import { Inter, Lusitana } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
