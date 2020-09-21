import environment from './environments';

if (process.env.NODE_ENV !== 'production'){
    const env = environment;
}

export const SECRET_KEY = process.env.SECRET || 'MINOVEAZGRAPHQL';

export enum COLLECTIONS {
    USERS='users'
}