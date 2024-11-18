import SideNav from '@/app/ui/dashboard/sidenav';

//todo 部分预渲染 先不用了 会报错卧槽
// export const experimental_ppr = true;
// export const experimental_ppr = true;


//todo 元数据 改善搜索引擎
// import { Metadata } from 'next';
//
// export const metadata: Metadata = {
//     title: 'Acme Dashboard',
//     description: 'The official Next.js Course Dashboard, built with App Router.',
//     metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };

//全局
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | HW Dashboard',
        default: 'HW Dashboard',
    },
    description: 'HW is handsome.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

//多页面共享
 
export default function Layout({ children }: { children: React.ReactNode }) {
    //表明了children 以及chidren的类型
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">


      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>


      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>


    </div>
  );
}