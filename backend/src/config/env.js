import dotenv from 'dotenv';
dotenv.config();

const required = (value, name) => {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
};

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: required(process.env.MONGO_URI, 'MONGO_URI'),
  JWT_SECRET: required(process.env.JWT_SECRET, 'JWT_SECRET'),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};


