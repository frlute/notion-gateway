import * as notion from '@notionhq/client';
import { getNotionClient } from './client';


export interface updatePageOptions {
    page_id: string;
    properties: Record<string, any>;
    archived: boolean;
    icon?: Record<string, any>;
    cover?: Record<string, any>;
}

export async function updatePage(options: updatePageOptions, client?: notion.Client) {
    if (!client) {
        client = getNotionClient();
    }
    const response = await client.pages.update(options as any);
    return response;
}    