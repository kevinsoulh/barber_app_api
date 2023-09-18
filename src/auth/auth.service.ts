import { db } from "../utils/db.server";

import { generateSecret, hashPassword, generateToken } from "../helper";

type userAuth = {
    email: string;
    password: string;
}


export const authenticateUser = async(user: userAuth): Promise<userAuth | null | string> => {
    if(user.email === "" || user.password === "") {
        return "You need to provide your credentials in order to continue";
    }

    const response = await db.user.findFirst({
        where: {
            email: user.email,
            password: hashPassword(user.password)
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            secret: true
        }
    })

    if(response) {
        return await db.user.update({
            where: {
                id: response.id,
            },
            data: {
                api_token: generateToken(response.email, response.secret)
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                secret: true,
                api_token: true
            }
        })
    } else {
        return "Invalid credentials"
    }

}