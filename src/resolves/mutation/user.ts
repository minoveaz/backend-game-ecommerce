import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from './../../config/constants';
import bcrypt from 'bcrypt';
import { asignDocumentId, findOneElement, insertOneElement } from '../../lib/db-operations';


const resolversUserMutation: IResolvers = {

    Mutation:{
        async register(_, { user }, { db }){
            //Comprobar que el usuario no existe

            const userCheck = await findOneElement(db, COLLECTIONS.USERS,{email: user.email});

            if (userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado y no esta disponible`,
                    user: null
                }; 
            }

            // Comprobar el ID del ultimo usuario registrado + 1
            user.id = await asignDocumentId(db, COLLECTIONS.USERS,{registerDate:-1});
            // asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();
            //Encriptar Password
            user.password =  bcrypt.hashSync(user.password,10);

            // Guardar el documento (registro) en la colección 
            return await  insertOneElement(db, COLLECTIONS.USERS, user)
            .then(async () =>{
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

export default resolversUserMutation;