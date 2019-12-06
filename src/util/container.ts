import {createContainer, asClass, InjectionMode} from 'awilix';

import UsersService from '../services/users';

export const container = createContainer({
    injectionMode: InjectionMode.PROXY
}).register({
    usersService: asClass(UsersService)
});