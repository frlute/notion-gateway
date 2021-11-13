import * as notion from '@notionhq/client';
import { getNotionClient } from './client';

export async function retrievePage(pageID: string, client?: notion.Client) {
    if (!client) {
        client = getNotionClient();
    }
    const response = await client.pages.retrieve({
        page_id: pageID
    });
    return response;
}    