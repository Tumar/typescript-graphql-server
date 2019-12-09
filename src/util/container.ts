import {createContainer, asClass, InjectionMode} from 'awilix';

export const container = createContainer({
    injectionMode: InjectionMode.PROXY
}).loadModules(['src/services/**/index.{ts,js}']);