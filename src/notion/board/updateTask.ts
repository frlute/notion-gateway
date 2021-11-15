import { updatePage } from "../api/updatePage";
import { TaskStatus, TaskStatusStrings } from "./interface";
import { queryTask } from "./queryTask";
import * as convert from './convert';

export async function updateTask(taskID: string, status: TaskStatusStrings='Completed') {
    const task = await queryTask(taskID);
    const currentStatus = TaskStatus[task.status];
    const completedStatusString = TaskStatus[TaskStatus.Completed];
    if (currentStatus >= TaskStatus.Completed) {
        throw new Error(`任务"${task.name}"当前状态为 ${task.status}, 不能更新到 ${status}`)
    }
    const options = {
        page_id: taskID,
        properties: {
            Status: {
                type: 'select',
                select: { 
                    name: status,
                }
            }
        },
        archived: false,
    }
    const result = await updatePage(options);
    return convert.pageToTask(result);
}