import { TaskTable } from "./interface";

export function pageToTask(page: any): TaskTable {
    const nameProp = page.properties.Name as any;
    const statusProp = page.properties.Status as any;
    const createdAtProp = page.properties.createdAt as any;
    const updatedAtProp = page.properties.updatedAt as any;
    const result: TaskTable = {
        pageId: page.id,
        name: nameProp.title[0].text.content,
        status: statusProp.select.name, 
        createdAt: createdAtProp.created_time,
        updatedAt: updatedAtProp.last_edited_time,
    }
    return result;
}