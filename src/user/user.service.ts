import { db } from "../utils/db.server";

import { generateSecret, hashPassword } from "../helper";

type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
}

export const listUsers = async(): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        }
    })
}

export const getUser = async(id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        }
    })
}

export const createUser = async(user: Omit<User, "id">): Promise<User> => {
    return db.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashPassword(user.password),
            api_token: "",
            secret: generateSecret()
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            secret: true 
        }
    })
}

export const updateUser = async(user: Omit<User, "id">, id: number): Promise<User> => {
    const { name, email } = user;

    return db.user.update({
        where: {
            id
        },
        data: {
            name,
            email
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
}

export const deleteUser = async(id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id
        }
    })
}