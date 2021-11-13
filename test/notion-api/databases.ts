
import { retrievePage } from "../../src/notion/api/retrievePage";
import { createTask } from "../../src/notion/board/createTask";
import { TaskStatus } from "../../src/notion/board/interface";
import { queryTasks } from "../../src/notion/board/queryTasks";
import { updateTask } from "../../src/notion/board/updateTask";

// queryTasks();
// retrievePage('51e1fb08c1074da482af5da5d91c62dd')
updateTask('51e1fb08c1074da482af5da5d91c62dd')
createTask('测试任务')


function test_Enum() {
    console.log('---string', TaskStatus['Unknown'])
}

// test_Enum()