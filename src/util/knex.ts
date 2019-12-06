import path from 'path';

import Knex from 'knex';

import { config } from './config';

export const knex = Knex({
    client: 'pg',
    connection: config.postgres,
    migrations: {
        directory: path.join(__dirname + '../../migrations')
    }
});

export const ensureKnexConnection = async () => knex.client.acquireRawConnection();




