import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
// console.log(process.env.TOKEN_SECRET)

export function generateAccessToken(email: string) {
    return jwt.sign({ email }, (process.env.TOKEN_SECRET || ''), { expiresIn: '86400s' });
}

export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            if(err.name =='TokenExpiredError'){
                return res.status(401).send({message:'token expired'});
            }
            console.table(err)
            return res.sendStatus(401);
        }
        req.user = user
        next()
    })
}