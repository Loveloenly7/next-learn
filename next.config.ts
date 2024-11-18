import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

    //todo 部分渲染选项开启
    // experimental: {
    //     // ppr: 'incremental',
    //     ppr: true, // 如果需要启用部分渲染，值应为 true
    // },
};

export default nextConfig;

// //官方文档找的格式ppr 还是报错
// import type { NextConfig } from 'next'
//
// const nextConfig: NextConfig = {
//     experimental: {
//         ppr: 'incremental',
//     },
// }
//
// export default nextConfig
