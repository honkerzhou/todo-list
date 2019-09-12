const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');
const config = require('./config');
const initDB = require('./db');
const handleErrors = require('./middlewares/handle-errors')
const router = require('./routes')
// const userRouter = require('./routes/user');
// const todoRouter = require('./routes/todo');

const app = new Koa();

app.use(handleErrors)
app.use(cors());
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaStatic(path.resolve(__dirname, 'dist')));

app.listen(config.PORT, '127.0.0.1', function () {
  console.log(
    '------Server is running on: http://localhost:%s------',
    config.PORT
  );
});

initDB(config.DB_URL);
