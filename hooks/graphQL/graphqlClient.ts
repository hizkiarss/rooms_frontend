"use client";

import { GraphQLClient } from 'graphql-request';


const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const graphqlClient = new GraphQLClient(endpoint);
