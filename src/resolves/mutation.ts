import { IResolvers } from 'graphql-tools';
import { find } from 'tslint/lib/utils';
import { COLLECTIONS } from '../config/constants';
import bcrypt from 'bcrypt';


const resolversMutation: IResolvers = {

    Mutation:{
        async register(_, { user }, { db }){
            //Comprobar que el usuario no existe

            const userCheck = await db.collection(COLLECTIONS.USERS).
                                findOne({email:user.email});

            if (userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado y no esta disponible`,
                    user: null
                }; 
            }

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
            //Encriptar Password
            user.password =  bcrypt.hashSync(user.password,10);

            // Guardar el documento (registro) en la colección 
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () =>{
                        return {
                            status: true,
                            message: `El usuario con email ${user.email} esta registrado correctamente `,
                            user: null
                        };
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return {
                        status: false,
                        message: `Error inesperado, prueba nuevamente `,
                        user: null
                    }; 
                });
        }
    }
};

export default resolversMutation;