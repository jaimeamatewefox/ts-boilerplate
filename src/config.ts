import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    tokenKey: process.env.TOKEN_KEY || 'tokenKey',
};

export default config;
