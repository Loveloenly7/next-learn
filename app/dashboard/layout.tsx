import SideNav from '@/app/ui/dashboard/sidenav';

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