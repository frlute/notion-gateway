import { createPage } from "../api/createPage"
import { TaskStatus } from "./interface"
import * as convert from './convert';

export async function createTask(taskName: string) {
    const options = {
        parent: {
            database_id: process.env.NOTION_TASK_DATABASE,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: taskName,
                        }

                    }
                ]
            },
            Status: {
                type: 'select',
                select: {
                    name: TaskStatus[TaskStatus.Inboxes],
                }
            }
        }
    }
    // TODO 考虑是否任务去重
    // TODO 未验证当前列是否匹配
    const result = await createPage(options)
    return convert.pageToTask(result);
} 