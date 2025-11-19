import { redisClient } from '@/config/redis';

export function Cacheable(ttlSeconds: number = 60, keyGenerator: (...args: any[]) => string): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const cacheKey = keyGenerator(...args);
            try {
                const cachedResult = await redisClient.get(cacheKey);
                if (cachedResult) {
                    return JSON.parse(cachedResult);
                }
            } catch (err) {
                console.error(err);
            }
            console.log('Cache miss for key:', cacheKey);
            const result = await originalMethod.apply(this, args);
            if (result) {
                redisClient.set(cacheKey, JSON.stringify(result), 'EX', ttlSeconds).catch(console.error);
            }
            return result;
        }
        return descriptor;
    };
}
