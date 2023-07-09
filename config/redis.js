import { Redis } from "ioredis";

let redisClient = new Redis(process.env.REDIS_URL);

module.exports = redisClient;