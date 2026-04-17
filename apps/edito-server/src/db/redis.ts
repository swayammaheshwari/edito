import { Redis, Configuration } from '@hocuspocus/extension-redis';
import { RedisPersistence } from 'y-redis';
import { createClient } from 'redis';

import { DateTime } from 'luxon';
export const DEFAULT_EXPIRY = 36000; // 10 Hours
const options: any = {
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD,
};
const redisURL = `redis://default:${options.password}@${options.host}:${options.port}`;

// const hocuspocusRedis = new Redis(options);

// Configure Redis extension without Redlock for single instance
const hocuspocusRedis = new Redis({
    ...options,
    // Disable Redlock since we're using a single Redis instance
    redlock: {
        // Set retryCount to 0 to disable Redlock entirely
        retryCount: 0,
        retryDelay: 200,
        retryJitter: 200,
        // Use a very short duration to minimize lock time
        duration: 1000,
    },
    // Alternative: Use simple prefix-based locking
    prefix: 'hocuspocus:',
});

const persistence = new RedisPersistence({
    redisOpts: options,
});
const redis = createClient({
    url: redisURL,
    socket: {
        reconnectStrategy: (retries, cause) => retries * 1000
    }
});
redis.on('error', (error) => {
    console.error(error);
});
redis.connect().then(() => {
    console.log('Redis connected successfully');
}).catch(err => {
    console.error('Redis connection error:', err);
});


export default hocuspocusRedis;

