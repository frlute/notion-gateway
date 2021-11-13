import { retrievePage } from "../api/retrievePage";
import * as convert from './convert';

export async function queryTask(taskID: string) {
    const pageResult = await retrievePage(taskID)
    const task = convert.pageToTask(pageResult);
    return task;
}