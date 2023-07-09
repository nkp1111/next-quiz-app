import { Redis } from "ioredis";

let redisClient = new Redis();

module.exports = redisClient;