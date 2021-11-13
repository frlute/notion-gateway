import * as notion from '@notionhq/client';

let notionClient: notion.Client;

export function createNotionClient() {
    notionClient = new notion.Client({
        auth: process.env.NOTION_TOKEN,
        // The client emits useful information to a logger. By default, it only emits warnings and errors.
        logLevel: notion.LogLevel.DEBUG,
    });
}

export function getNotionClient(): notion.Client {
    if (!notionClient) {
        createNotionClient();
    }
    return notionClient;
}