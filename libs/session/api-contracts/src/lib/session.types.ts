import { TypeOf } from 'zod'

import { createNonceSchema, verifyNonceSchema } from './session.scheme'

export type CreateNonceRequest = TypeOf<typeof createNonceSchema>

export type CreateNonceResponse = {
    nonce: string
}

export type VerifyNonceRequest = TypeOf<typeof verifyNonceSchema>

//export type VerifyNonceResponse = void
