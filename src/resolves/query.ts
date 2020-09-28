import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';
import JWT from '../lib/jwt';



const resolversQuery: IResolvers = {

    Query:{
        async users(_, __, { db }){
            try{
                return {
                    status:true,
                    message: 'Lista de usuarios cargada correctamente',
                    users: await db.collection(COLLECTIONS.USERS).
                    find().toArray()
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
                const emailVerification = await db.collection(COLLECTIONS.USERS).
                findOne({email, password});
                if (emailVerification === null){
                    return{
                        status: false,
                        message: 'Usuario no Existe',
                        token: null
                    };
                }
                const user = await db.collection(COLLECTIONS.USERS).
                findOne({email});
                return {
                    status:true,
                    message: 
                    user === null
                        ? 'Password y/o usuario no correctos, sesión no iniciada'
                        : 'Usuario cargado correctamente',
                    token: new JWT().sign({user})
                };
            }catch(error){
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. ',
                    token: null, 
                };
            }
        }
    }
};

export default resolversQuery;