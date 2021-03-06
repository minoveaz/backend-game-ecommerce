import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from './../../config/constants';
import JWT from './../../lib/jwt';
import bcrypt from 'bcrypt';
import { findOneElement, findElements } from '../../lib/db-operations';


const resolversUserQuery: IResolvers = {

    Query:{
        async users(_, __, { db }){
            try{
                return {
                    status:true,
                    message: 'Lista de usuarios cargada correctamente',
                    users: await findElements(db,COLLECTIONS.USERS),
                };
            }catch(error){
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar los usuarios. Comprueba que teienes correctamente añadido',
                    users: []
                };
            }
        },
        async login(_,{email, password}, { db }){
            try{
                const user = await findOneElement(db, COLLECTIONS.USERS, {email});
                if (user === null){
                    return{
                        status: false,
                        message: 'Usuario no Existe',
                        token: null
                    };
                }
                const passwordCheck = bcrypt.compareSync(password, user.password);
                
                if (passwordCheck !== null ){
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status:true,
                    message: 
                        !passwordCheck
                        ? 'Password y/o usuario no correctos, sesión no iniciada'
                        : 'Usuario cargado correctamente',
                    token: 
                        !passwordCheck
                        ? null
                        : new JWT().sign({user},EXPIRETIME.H24),
                    user
                };
            }catch(error){
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. ',
                    token: null, 
                };
            }
        },
        me(_, __, {token}){
            console.log(token);
            let info = new JWT().verify(token);
            if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
                return {
                    status: false, 
                    message:info,
                    user:null
                };
            }
            return{
                status: true,
                message: 'Usuario autenticado correctamente mediante el token',
                user: Object.values(info)[0]
            };
        }
    },
};

export default resolversUserQuery;