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
    const result = await createPage(options)
    console.log('-------create result', result)
    return convert.pageToTask(result);
} 