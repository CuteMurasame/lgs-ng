import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';
import path from 'path';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/hello', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Hello from Koa with TypeScript!',
        timestamp: new Date()
    };
});

app.use(router.routes()).use(router.allowedMethods());

const distPath = path.join(__dirname, '../../dist');
app.use(serve(distPath));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});