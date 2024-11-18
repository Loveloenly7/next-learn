'use client';
//todo 客户端组件 监听器和hook

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

// import { useSearchParams } from 'next/navigation';

//todo 限制搜索次数 防止弹跳
import {useDebouncedCallback} from 'use-debounce';

import {useSearchParams, usePathname, useRouter} from 'next/navigation';

// export default function Search({placeholder}: { placeholder: string }) {
export default function Search({ placeholder }: { placeholder: string }) {

    // //todo 参数钩子
    const searchParams = useSearchParams();
    //
    // //todo 另外两个钩子
    const pathname = usePathname();
    const {replace} = useRouter();


//每当用户输入的值发生变化的时候 都会调用这个函数
    //todo 发生变化就会调用
    // function handleSearch(term: string) {
        const handleSearch = useDebouncedCallback((term) => {

        // console.log(term);
        console.log(`Searching... ${term}`);

        //todo 搜索实例
        const params = new URLSearchParams(searchParams);

        //todo 输入新的搜索的时候 页码重制为1
            params.set('page', '1');

        //为空就删除查询条件
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        //当前路径 然后加上凭借参数
        replace(`${pathname}?${params.toString()}`);
        // /dashboard/invoices?query=lee 拼出来大概这样

    // }

        }, 300);

    //todo 限制弹跳
    // const handleSearch = useDebouncedCallback((term) => {

    //
    // console.log(`Searching... ${term}`);

    //todo 拿到参数
    // const params = new URLSearchParams(searchParams);
    // console.log(term);

    //     //todo 根据用户的输入 调整样式 就是一些预先的搜索词语
    //     if (term) {
    //         params.set('query', term);
    //     } else {
    //         params.delete('query');
    //     }
    //
    //     //todo 拼接URL了 也就是说在动态更新了
    //     replace(`${pathname}?${params.toString()}`);
    // }, 300);
    // //todo 停止输入300ms后再运行代码

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search！
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}

                //todo 发生变化
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}

                //todo 保持URL和输入同步
                defaultValue={searchParams.get('query')?.toString()}


            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}


