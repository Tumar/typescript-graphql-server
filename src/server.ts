import express from 'express';
import session from 'express-session';
import uuidv4 from 'uuid/v4';
import RedisStore from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { AwilixContainer } from 'awilix';

import User from 'src/models/User';

import resolvers from './resolvers';
import typeDefs from './typedefs';
import { container } from './util/container';
import { createAuthenticationMiddleware } from './middlewares/auth';
import { isProduction, config } from './util/config';
import { redis } from './util/redis';

declare global {
  interface GraphQLContext {
    diContainer: AwilixContainer
    req: Express.Request & {
      user?: User
    }
  }
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
      diContainer: container,
      req
    }),
    playground: isProduction ? false : {
      settings: {
        'request.credentials': 'include',
      },
    }
  });

  const app = express()
    .use(
      session({
        secret: config.session.secret,
        store: new (RedisStore(session))({client: redis}),
        genid: () => uuidv4(),
        resave: false,
        saveUninitialized: true,
        rolling: true,
        cookie: {
          path: '/graphql',
          secure: isProduction
        }
      })
    )
    .use(container.build(createAuthenticationMiddleware));

  server.applyMiddleware({
    app,
    path: '/graphql'
  });

  app.listen({ port: config.server.port }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  });
}

main()