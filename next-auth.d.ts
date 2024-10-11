import 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        error?: string;
        user: {
            id: string;
            email: string;
            roles: string[];
        } & DefaultSession['user'];
    }

    interface User {
        roles?: string[];
        token?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        roles?: string[];
        accessToken?: string;
        error?: string;
    }
}