import * as notion from '@notionhq/client';
import { getNotionClient } from "./client";

export async function queryDatabase(queryParams: Record<string, any>, client?: notion.Client) {
    if (!client) {
        client = getNotionClient();
    }
    const response = await client.databases.query(queryParams as any);

    return response;
}    