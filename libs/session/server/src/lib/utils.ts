import * as jwt from 'jsonwebtoken'

import { CONFIG } from './config'

export const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, CONFIG.secretJwt) as jwt.JwtPayload
        return payload
    } catch {
        return null
    }
}

export const isExpComing = (payload: jwt.JwtPayload) => {
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp && payload.exp - currentTime <= CONFIG.tokenExpThreshold
}

export const generateNonce = () => String(Math.floor(Math.random() * 90000) + 10000)
