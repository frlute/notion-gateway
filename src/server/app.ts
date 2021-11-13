import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import { queryTasks } from '../notion/board/queryTasks';
import { queryTask } from '../notion/board/queryTask';
import { createTask } from './handlers/createTask';
import { updateTask } from '../notion/board/updateTask';
import { HandlerResponse } from './handlers/interface'; 

export function createApp() {
    const app = new Koa();

    // Middlewares
    app.use(json());
    app.use(logger());
    app.use(bodyParser());

    addRouter(app)

    const port = process.env.PROT;
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
        const resp: HandlerResponse = {
            code: 0,
            results: undefined,
        }
        try {
           const result = await updateTask(taskID)
           resp.results = result;
        } catch (e) {
            resp.code = 500;
            resp.message = e.message;
        }

        ctx.body = resp;
        await next();
    })

    // routes
    app.use(router.routes()).use(router.allowedMethods()) 
}