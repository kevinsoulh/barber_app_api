import dotevn from 'dotenv';
import express from 'express';
import cors from 'cors';

import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';

dotevn.config();

if(!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
