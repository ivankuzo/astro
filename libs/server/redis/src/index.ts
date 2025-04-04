import { closeRedis, getRedis, initRedis } from './lib/redis-client'
import * as operations from './lib/redis-service'

export { getRedis, closeRedis, initRedis }

export const redis = {
    set: operations.set,
    get: operations.get,
    del: operations.del,
    exists: operations.exists,
    setNX: operations.setNX,
    ttl: operations.ttl,

    incrBy: operations.incrBy,
    decrBy: operations.decrBy,

    cache: operations.cache,
    cacheGet: operations.cacheGet,
    cacheSet: operations.cacheSet,
    cacheDel: operations.cacheDel,
}

export * from './lib/redis-service'
