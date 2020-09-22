import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';



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
                const user = await db.collection(COLLECTIONS.USERS).
                findOne({email, password});
                return {
                    status:true,
                    message: user === null
                        ? 'Password y/o usuario no correctos, sesión no iniciada'
                        : 'Lista de usuarios cargada correctamente',
                    user,
                };
            }catch(error){
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. ',
                    user: null, 
                };
            }
        }
    }
};

export default resolversQuery;