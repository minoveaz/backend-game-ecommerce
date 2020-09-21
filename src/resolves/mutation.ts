import { IResolvers } from 'graphql-tools';
import { find } from 'tslint/lib/utils';
import { COLLECTIONS } from '../config/constants';


const resolversMutation: IResolvers = {

    Mutation:{
        async register(_, { user }, { db }){
            // Comprobar el ID del ultimo usuario registrado + 1 
            const lastUser = await db.collection(COLLECTIONS.USERS).
                                find().
                                limit(1).
                                sort( { registerDate: -1}).toArray();
            if (lastUser.length === 0){
                user.id = 1;
            }else{
                user.id = lastUser[0].id +1;
            }
            // asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();
            // Guardar el documento (registro) en la colección 
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () =>{
                        return user;
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return null; 
                });
        }
    }
};

export default resolversMutation;