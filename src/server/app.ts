import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import { queryTasks } from '../notion/board/queryTasks';
import { queryTask } from '../notion/board/queryTask';
import { createTask } from './handlers/createTask';
import { HandlerResponse } from './handlers/interface'; 
import { updateTask } from './handlers/updateTask';

export function createApp() {
    const app = new Koa();

    // Middlewares
    app.use(json());
    app.use(logger());
    app.use(bodyParser());

    addRouter(app)

    const port = process.env.PROT || 7777;
    app.listen(port, ()=> {
        console.log(`start notion-gateway service, the port ${port}`)
    })
} 

function addRouter(app: Koa) {
    const router = new Router();

    // router
    router.get('/internal/ping', async (ctx, next) => {
        ctx.body = 'ok';
        await next();
    })

    router.get('/tasks', async (ctx, next) => {
        const results = await queryTasks();
        const resp: HandlerResponse = {
            code: 0,
            results: results
        }
        ctx.body = resp;
        await next();
    })

    router.get('/task/:taskID', async (ctx, next) => {
        const taskID = ctx.params.taskID;
        const result = await queryTask(taskID);
        const resp: HandlerResponse = {
            code: 0,
            results: result
        }
        ctx.body = resp;
        await next();
    })

    router.post('/task', async(ctx, next) => {
        const result = await createTask(ctx)
        const resp: HandlerResponse = {
            code: 0,
            results: result
        }
        ctx.body = resp;
        await next();
    })

    router.put('/task/:taskID', async(ctx, next) => {
        const taskID = ctx.params.taskID;
        const resp = await updateTask(ctx, taskID);
        ctx.body = resp;
        await next();
    })

    // routes
    app.use(router.routes()).use(router.allowedMethods()) 
}