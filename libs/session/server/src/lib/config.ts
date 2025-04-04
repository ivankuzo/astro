const secretJwt = process.env.SESSION_SECRET_JWT

if (!secretJwt) {
    throw new Error('SESSION_SECRET_JWT is not set')
}

export const CONFIG = {
    secretJwt,
    expiresIn: '24h',
    maxAge: 24 * 60 * 60 * 1000,
    tokenExpThreshold: 600,
} as const
