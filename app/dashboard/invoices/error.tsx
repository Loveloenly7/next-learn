'use client';

//todo 发生错误时的回退页面
//比如说你之前在那里写的东西。。

import {useEffect} from 'react';

//两个参数 一个是js原生的error对象


export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    //todo 这里就是尝试点一下重新加载页面
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}