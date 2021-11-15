import { queryDatabase } from "../api/queryDatabase";
import { TaskStatus, TaskTable } from "./interface";
import * as convert from './convert';

export async function queryTasks(): Promise<TaskTable[]> {
    const databaseID = process.env.NOTION_TASK_DATABASE;
    const queryParams = {
        database_id: databaseID,
        filter: {
            property: 'Status',
            select: {
                'does_not_equal': TaskStatus[TaskStatus.Completed],
            }
        },
        sorts: [
            {
                property: 'Status',
                direction: 'descending'
            },
        ]
    }
    const response = await queryDatabase(queryParams);
    // TODO 处理分页数据
    const tasks = response.results.map((page) => {
        return convert.pageToTask(page);
    })    
    return tasks;
}