const { ApolloServer } = require('apollo-server-koa');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const Koa = require('koa');
const Router = require('koa-router');
const http = require('http');
const typeDefs = require('./model/schema/index');
const resolvers = require('./model/resolver/index');

const router = new Router();

// TODO：router add query
async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    mocks: false
  });

  await server.start();
  const app = new Koa();
  router
  .get('/posts', ctx => {
    ctx.body = '获取用户列表'
  })
  .post('/users', ctx => {
    ctx.body = '创建用户'
  })
  .put('/users/:id', ctx => {
    // 解析 URL 参数
    ctx.body = `更新 ID 为 ${ctx.params.id} 的用户`
  })
  .delete('/users/:id', ctx => {
    // 解析 URL 参数
    ctx.body = `删除 ID 为 ${ctx.params.id} 的用户`
  })
  app.use(router.routes())
  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer(typeDefs, resolvers)