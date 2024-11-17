// export default function Page() {
//     return <p>Dashboard Page</p>;
//   }

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';


import { Suspense } from 'react';
// import { RevenueChartSkeleton } from '@/app/ui/skeletons';

//为什么不同组件这里要用不同的骨架？我用一样的不行吗
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
    CardsSkeleton,
} from '@/app/ui/skeletons';

// import { fetchRevenue } from '@/app/lib/data';
// import { fetchRevenue, fetchLatestInvoices, totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} from '@/app/lib/data';
// import { fetchRevenue, fetchLatestInvoices, fetchCardData} from '@/app/lib/data';

//拿这个组件的方法放到这个ui里面去 todo 流传输
// import { fetchLatestInvoices, fetchCardData} from '@/app/lib/data';
import { fetchCardData} from '@/app/lib/data';


//todo 卡片异步
import CardWrapper from '@/app/ui/dashboard/cards';
 
export default async function Page() {


  // const revenue = await fetchRevenue();

  //导入之后 先异步获取对象 获取到了再展示。。
  // const latestInvoices = await fetchLatestInvoices();

  // const totalPaidInvoices = await fetchLatestInvoices();
  // const totalPendingInvoices = await fetchLatestInvoices();
  // const numberOfInvoices = await fetchLatestInvoices();
  // const numberOfCustomers = await fetchLatestInvoices();

  //解构的写法
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();




  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* //卡片组件 */}
        {/*<Card title="Collected" value={totalPaidInvoices} type="collected" />*/}
        {/*<Card title="Pending" value={totalPendingInvoices} type="pending" />*/}
        {/*<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />*/}
        {/*<Card*/}
        {/*  title="Total Customers"*/}
        {/*  value={numberOfCustomers}*/}
        {/*  type="customers"*/}
        {/*/>*/}
          <Suspense fallback={<CardsSkeleton />}>
              <CardWrapper />
          </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}

        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        {/* 肯定要降级这个组件 */}

        <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
     
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}