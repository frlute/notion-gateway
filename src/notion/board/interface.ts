export enum TaskStatus {
    Unknown,
    Inboxes,
    TadayTask,
    InProgress,
    Completed,
}

export type TaskStatusStrings = keyof typeof TaskStatus;

export interface TaskTable {
    pageId: string;
    name: string;
    status: TaskStatusStrings;
    createdAt: Date;
    updatedAt: Date;
}

