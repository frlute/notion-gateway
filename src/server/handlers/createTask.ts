import * as Koa from "koa";
import { createTask as createNotionTask } from '../../notion/board/createTask';

interface createTaskRequest {
    name: string;
}

export async function createTask(ctx: Koa.Context) {
    const { name } = <createTaskRequest>ctx.request.body;
    const result = await createNotionTask(name);
    return result;
}