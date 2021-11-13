import { createNotionClient } from "./notion/api/client";
import { createApp } from "./server/app";

function main() {
    // 加载环境变量配置 .env 文件
    require('dotenv').config();

    createNotionClient();
    createApp();
}


main();