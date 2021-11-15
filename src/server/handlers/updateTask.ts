import { HandlerResponse } from "./interface";
import * as Koa from "koa";
import { updateTask as updateNotionTask } from '../../notion/board/updateTask';
import { TaskStatusStrings } from "../../notion/board/interface";

interface updateTaskRequest {
    status: TaskStatusStrings;
}

export async function updateTask(ctx: Koa.Context, taskID: string) {
    const resp: HandlerResponse = {
        code: 0,
        results: undefined,
    }
    try {
        let { status } = <updateTaskRequest>ctx.request.body;
        if (!status) {
            status = 'Completed';
        }
       const result = await updateNotionTask(taskID, status)
       resp.results = result;
    } catch (e) {
        resp.code = 500;
        resp.message = e.message;
    }
    return resp;
}