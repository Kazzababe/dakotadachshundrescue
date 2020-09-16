import redis from 'redis';

const redisClient = redis.createClient({
    password: "password",
});

export default redisClient;
