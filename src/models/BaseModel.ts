import {Model, QueryContext} from 'objection';

import {knex} from '../util/knex';

interface ModelOptions {
    autoUpdatedColumns?: ('createdAt' | 'updatedAt')[]
}
 
export declare type Class<T> = new (...args: any[]) => T;

Model.knex(knex);

export const createBaseModel = <TModelColumns>(options?: ModelOptions) => {
    const {autoUpdatedColumns} = options || {};

    class BaseModel extends Model {
        public createdAt?: Date;
        public updatedAt?: Date;
    
        public async $beforeInsert(queryContext: QueryContext) {
            if (autoUpdatedColumns) {
                if (autoUpdatedColumns.includes('createdAt') && !this.createdAt) {
                    this.createdAt = new Date();
                }
                if (autoUpdatedColumns.includes('updatedAt') && !this.updatedAt) {
                    this.updatedAt = new Date();
                }
            }
        }
    }

    return Object.assign((BaseModel as any) as Class<BaseModel & TModelColumns>, Model);
}

