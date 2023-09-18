import * as express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthService from './auth.service';

export const authRouter = express.Router();

authRouter.post('/signin', 
    body("email").isString(), 
    body("password").isString(), 
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await AuthService.authenticateUser(request.body);

            if(user) return response.status(200).json(user);

            return response.status(400).json(user)
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);