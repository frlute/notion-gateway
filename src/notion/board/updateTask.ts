import { updatePage } from "../api/updatePage";
import { TaskStatus } from "./interface";
import { queryTask } from "./queryTask";
import * as convert from './convert';

export async function updateTask(taskID: string) {
    const task = await queryTask(taskID);
    const cuttentStatus = TaskStatus[task.status];
    const completeStatusString = TaskStatus[TaskStatus.Completed];
    console.log('------', cuttentStatus, TaskStatus.Completed)
    if (cuttentStatus >= TaskStatus.Completed) {
        throw new Error(`任务"${task.name}"当前状态为 ${task.status}, 不能更新到 ${completeStatusString}`)
    }
    const options = {
        page_id: taskID,
        properties: {
            Status: {
                type: 'select',
                select: { 
                    name: completeStatusString,
                }
            }
        },
        archived: false,
    }
    const result = await updatePage(options);
    return convert.pageToTask(result);
}