import {Model, JSONSchema} from 'objection';

import { createBaseModel } from './BaseModel';
import { Users } from '../__generated/osm';

export default class User extends createBaseModel<Users>({
    autoUpdatedColumns: ['createdAt', 'updatedAt']
}) {
    static tableName = 'users'

    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['email', 'passwordHash'],

        properties: {
            id: {type: 'integer'},
            email: {type: 'string'},
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            passwordHash: {type: 'string'},
        }
    }
}