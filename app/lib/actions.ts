//表单的 服务器操作

//这里所有方法都基于 服务器
'use server';

//todo 登录认证相关
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

//todo 提交表单 创建 异步操作
// export async function createInvoice(formData: FormData) {}

//todo 类型一致
import { z } from 'zod';

//查数据库
import { sql } from '@vercel/postgres';

//清除缓存 重新发请求
import { revalidatePath } from 'next/cache';

//重定向
import { redirect } from 'next/navigation';


//todo zod 服务器端的表单验证
//加上了如果为空的判断
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: '请选择一个客户.',
    }),
    amount: z.coerce.number()
        //比什么还大 就是用户可能会填负数。。
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

//zod 进行类型转换
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

//todo 服务器端验证表单
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

//提取formdata的值
// export async function createInvoice(formData: FormData) {
    // const rawFormData = {
    //处理类型一致
//现在需要传两个参数进来了
export async function createInvoice(prevState: State, formData: FormData) {
        // const { customerId, amount, status } = CreateInvoice.parse({
    //这里换了validatedFields 来接受safe的方法返回的对象
        const validatedFields= CreateInvoice.safeParse({
        //使用 FormData.get(key) 方法读取表单字段的值
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });


        //todo 服务器验证表单 这里确实提前返回了 但是对于前端页面来说没有什么反馈
        //检查是否通过了安全认证
    if (!validatedFields.success) {
        console.log(validatedFields);
        return {

            errors: validatedFields.error.flatten().fieldErrors,
            message: '前端服务器显示不通过表单认证 请重新填写.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    //??



    //转美分
    const amountInCents = amount * 100;

    //发票的创建日期
    const date = new Date().toISOString().split('T')[0];

    //执行sql语句

    //todo 异常处理
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        return {
            //todo
            message: 'Database Error: 发票创建失败.',
        };
    }

    //清除缓存 重新发请求
    //也就是更新一次数据
    revalidatePath('/dashboard/invoices');

    //提交之后 重新定向回来
    redirect('/dashboard/invoices');

    // Test it out:
    // console.log(rawFormData);
}

// export async function updateInvoice(id: string, formData: FormData) {

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {//todo 错误处理  新传入一个状态
//
//     与createInvoice操作类似，您在这里：
//
// 从formData中提取数据。
// 使用Zod验证类型。
// 将金额转换为美分。
// 将变量传递到您的SQL查询中。
// 调用revalidatePath以清除客户端缓存并提出新的服务器请求。
// 调用redirect将用户重定向到发票页面。
    //类型转换
    // const { customerId, amount, status } = UpdateInvoice.parse({
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    // });

    //依然用safe方法
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        //这里我不知道怎么返回给页面 但是 服务器端的表单验证是实现了
        console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '用于编辑的表单填写没有通过服务器验证.',
        };
    }

    console.log(validatedFields);


    //美分显示发票 加一条数据相当于
    //相当于之前换了对象封装 现在需要解构一下了
    const { customerId, amount, status } = validatedFields.data;

    //他妈的顺序错了我就说。。。
    const amountInCents = amount * 100;


    //添加数据库的操作
    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

//todo 删除的异步方法

export async function deleteInvoice(id: string) {
//todo 测试 发生错误的时候会发生什么？？
//     throw new Error('Failed to Delete Invoice');
    try {
        //为什么异常捕获在这里只需要去抓sql语句呢？
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }

    //因为删除操作不需要新的页面 所以删除之后只需要重新加载一下页面就好
    revalidatePath('/dashboard/invoices');
}


//todo 登录 认证方法
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


