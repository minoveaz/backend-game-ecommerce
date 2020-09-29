import jwt from 'jsonwebtoken';
import { IJWT } from '../interfaces/jwt.interface';
import { SECRET_KEY, MESSAGES, EXPIRETIME } from '../config/constants';

class JWT {
    private secretKey = SECRET_KEY as string; 

    // Información de Payload con fecha de caducidad de 24 horas de caducidad
    sign(data: IJWT, expiresIn: number = EXPIRETIME.H24){
        return jwt.sign(
            {user: data.user},
            this.secretKey,
            {expiresIn} 
        );
    }

    verify(token: string){
        try{
            return jwt.verify(token, this.secretKey);
        }catch (e){
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}

export default JWT; 