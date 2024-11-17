// import '@/app/ui/global.css';
// //导入全局css布局

// //导入全局你要用的字体
// import { inter } from '@/app/ui/fonts';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//      <body className={`${inter.className} antialiased`}>{children}</body>
//     </html>
//   );
// }

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
