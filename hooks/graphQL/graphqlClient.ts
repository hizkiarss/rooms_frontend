"use client";
import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8080/graphql";

export const graphqlClient = new GraphQLClient(endpoint);
