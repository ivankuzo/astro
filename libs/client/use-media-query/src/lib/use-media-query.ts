import { useEffect, useState } from 'react'

type Options = 'min-width' | 'max-width'

export const useMediaQuery = (query: Options, value: string): boolean => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(`(${query}: ${value})`)

        if (media.matches) {
            setMatches(true)
        }

        const listener = () => setMatches(media.matches)

        window.addEventListener('resize', listener)

        return () => window.removeEventListener('resize', listener)
    }, [matches, query, value])

    return matches
}
