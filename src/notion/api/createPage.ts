import * as notion from '@notionhq/client';
import { getNotionClient } from './client';

interface parentOptions {
    database_id: string;
} 

interface createPageOptions {
    parent: parentOptions;
    properties: Record<string, any>;
    children?: Record<string, any>[];
    icon?: Record<string, any>;
    cover?: Record<string, any>;
}

export async function createPage(options: createPageOptions, client?: notion.Client) {
    if (!client) {
        client = getNotionClient();
    }
    const response = await client.pages.create(options as any);
    return response;
}    