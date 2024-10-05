declare module 'graphql-request' {
    export class GraphQLClient {
        constructor(endpoint: string, options?: RequestInit);
        request<T = any>(document: string | DocumentNode, variables?: Record<string, any>): Promise<T>;
        setHeaders(headers: Record<string, string>): GraphQLClient;
        setHeader(key: string, value: string): GraphQLClient;
        setEndpoint(value: string): GraphQLClient;
    }

    export function gql(literals: TemplateStringsArray, ...placeholders: any[]): DocumentNode;

    export type DocumentNode = any; // This is a simplification. If you're using @types/graphql, you can import the actual type.
}