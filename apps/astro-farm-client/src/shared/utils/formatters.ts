export const truncateAddress = (address: string) => `${address.slice(0, 7)}..${address.slice(-4)}`

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`
    }
    if (minutes > 0) {
        return `${minutes}m ${secs}s`
    }
    return `${secs}s`
}
