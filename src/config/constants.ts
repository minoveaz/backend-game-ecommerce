import environment from './environments';

if (process.env.NODE_ENV !== 'production'){
    const env = environment;
}

export const SECRET_KEY = process.env.SECRET || 'MINOVEAZGRAPHQL';

export enum COLLECTIONS {
    USERS='users'
}

export enum MESSAGES{
    TOKEN_VERIFICATION_FAILED ='token no valido, inicia sesión de nuevo'
}