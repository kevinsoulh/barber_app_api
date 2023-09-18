import crypto from "crypto";
import jwl from 'jsonwebtoken'

export const generateSecret = (): string => {
    return crypto.randomBytes(64).toString('hex');
}

export const hashPassword = (password: string | undefined): string => {
    return crypto.createHash('sha256').update(password as string).digest('hex');
}

export const generateToken = (email: any, secret: any) => {
    return jwl.sign({email: email}, secret, {
        expiresIn: "30 days"
    });
}