import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

//获取id
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

//todo 404处理 编辑不存在的用户
import { notFound } from 'next/navigation';

//todo 编辑发票详细信息的页面
// export default async function Page() {

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Edit',
};

//传入需要的参数
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    //解构 获取参数
    //这里并行获取了
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    //如果上面并行获取的这个方法 没有拿到对应的js对象的话
    if (!invoice) {
        //todo 404的处理是去看对象是否为空
        notFound();
    }


    return (


        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}