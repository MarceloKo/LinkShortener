
export function uuidV7ToDate(id: string): Date | null {
    const compact = id.replace(/-/g, '')
    if (compact.length !== 32 || compact[12] !== '7')
        return null

    const msHex = compact.slice(0, 12)
    const ms = Number(BigInt(`0x${msHex}`))
    return new Date(ms)
}
