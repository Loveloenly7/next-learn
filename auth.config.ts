import type { NextAuthConfig } from 'next-auth';


//todo 权限验证 只包含了pages的选项
export const authConfig = {
    pages: {
        // 没登录的时候会被重定向到。。
        signIn: '/login',
    },
    //添加逻辑 除非登陆了 不然就重定向
    callbacks: {
        //实现回调页面
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
// } satisfies NextAuthConfig;