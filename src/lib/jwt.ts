import jwt from 'jsonwebtoken';
import { IJWT } from '../interfaces/jwt.interface';
import { SECRET_KEY, MESSAGES } from '../config/constants';

class JWT {
    private secretKey = SECRET_KEY as string; 

    sign(data: IJWT){
        return jwt.sign(
            {user: data.user},
            this.secretKey,
            {expiresIn: 24 * 60 * 60} // 24 horas de caducidad
        );
    }

    veryfy(token: string){
        try{
            return jwt.verify(token, this.secretKey) as string;
        }catch (e){
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}

export default JWT; 