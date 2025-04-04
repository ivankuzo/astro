import { getRedis } from './redis-client'

/**
 * Core Redis operations
 */

/**
 * Store value with optional expiration time
 */
export const set = async <T>(key: string, value: T, expireSeconds?: number): Promise<void> => {
    const client = await getRedis()

    if (expireSeconds) {
        await client.set(key, JSON.stringify(value), { EX: expireSeconds })
    } else {
        await client.set(key, JSON.stringify(value))
    }
}

/**
 * Get value with JSON deserialization
 */
export const get = async <T>(key: string): Promise<T | null> => {
    const client = await getRedis()
    const data = await client.get(key)

    if (!data) return null

    try {
        return JSON.parse(data) as T
    } catch {
        return data as unknown as T
    }
}

/**
 * Delete key
 */
export const del = async (key: string): Promise<void> => {
    const client = await getRedis()
    await client.del(key)
}

/**
 * Check if key exists
 */
export const exists = async (key: string): Promise<boolean> => {
    const client = await getRedis()
    return (await client.exists(key)) === 1
}

/**
 * Set key only if it doesn't exist
 * Returns true if key was set, false otherwise
 */
export const setNX = async <T>(key: string, value: T, expireSeconds?: number): Promise<boolean> => {
    const client = await getRedis()

    if (expireSeconds) {
        return client.set(key, JSON.stringify(value), { NX: true, EX: expireSeconds }) !== null
    }

    return client.set(key, JSON.stringify(value), { NX: true }) !== null
}

/**
 * Get key time-to-live in seconds
 * Returns -1 if no expiration, -2 if key doesn't exist
 */
export const ttl = async (key: string): Promise<number> => {
    const client = await getRedis()
    return client.ttl(key)
}

/**
 * Counter operations
 */

/**
 * Increment counter
 */
export const incrBy = async (key: string, by = 1): Promise<number> => {
    const client = await getRedis()
    return client.incrBy(key, by)
}

/**
 * Decrement counter
 */
export const decrBy = async (key: string, by = 1): Promise<number> => {
    const client = await getRedis()
    return client.decrBy(key, by)
}

/**
 * List operations
 */

/**
 * Push value to the end of list
 */
export const rPush = async <T>(key: string, value: T): Promise<number> => {
    const client = await getRedis()
    return client.rPush(key, JSON.stringify(value))
}

/**
 * Get list elements by range
 */
export const lRange = async <T>(key: string, start: number, stop: number): Promise<T[]> => {
    const client = await getRedis()
    const data = await client.lRange(key, start, stop)
    return data.map(item => JSON.parse(item))
}

/**
 * Caching utilities
 */

/**
 * Store data in cache
 */
export const cacheSet = async <T>(key: string, data: T, expireSeconds: number): Promise<void> => {
    const cacheKey = `cache:${key}`
    await set(cacheKey, data, expireSeconds)
}

/**
 * Retrieve data from cache
 */
export const cacheGet = async <T>(key: string): Promise<T | null> => {
    const cacheKey = `cache:${key}`
    return get<T>(cacheKey)
}

/**
 * Remove data from cache
 */
export const cacheDel = async (key: string): Promise<void> => {
    const cacheKey = `cache:${key}`
    await del(cacheKey)
}

/**
 * Get data from cache or execute function and cache result
 *
 * @example
 * const userData = await cache(
 *   'user:profile:123',
 *   async () => await fetchUserFromDb(123),
 *   60 * 60 // 1 hour
 * )
 */
export const cache = async <T>(
    key: string,
    fetchFn: () => Promise<T>,
    expireSeconds: number = 60 * 60 // Default: 1 hour
): Promise<T> => {
    const cachedData = await cacheGet<T>(key)

    if (cachedData !== null) {
        return cachedData
    }

    const freshData = await fetchFn()
    await cacheSet(key, freshData, expireSeconds)
    return freshData
}
