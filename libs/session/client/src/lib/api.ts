import axios from 'axios'
import {
    CreateNonceRequest,
    CreateNonceResponse,
    VerifyNonceRequest,
} from '@astro/session-api-contracts'

const API_BASE_URL = '/api/session'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const createNonce = async (
    req: CreateNonceRequest['body']
): Promise<CreateNonceResponse> => {
    const { data } = await api.post<CreateNonceResponse>('/createNonce', req)
    return data
}

export const verifyNonce = async (req: VerifyNonceRequest['body']): Promise<void> => {
    await api.post('/verifyNonce', req)
}

export const signOut = async (): Promise<void> => {
    await api.delete('/signOut')
}
