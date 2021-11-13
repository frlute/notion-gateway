# Notion-Gateway

提供 notion api 封装及对外提供任务 CRUD api.

## 运行方式

```shell
// 下载依赖
npm install

// 增加环境变量到 .env 配置文件中
NOTION_TOKEN='xxxx'
NOTION_TASK_DATABASE='xxxx'
PROT=7777

npm run dev
```

- 测试

测试方式

```shell
node -r ts-node/register test/notion-api/databases.ts
```