import { api } from '@astro/client-api'
import {
    GameResponse,
    SubmitPipesGameResultRequest,
    GetPipesGameResponse,
} from '@astro/astro-farm-api-contracts'

export const getPipesGame = async (): Promise<GetPipesGameResponse> => {
    const { data } = await api.get<GetPipesGameResponse>('/pipes')
    return data
}

export const submitPipesGameResult = async (
    request: SubmitPipesGameResultRequest
): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/pipes/submit-result', request.body)
    return data
}
