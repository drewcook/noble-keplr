/**
 * Converts a value to a bigint
 * @param value The value to convert
 * @returns A bigint
 */
export const toBigInt = (value: string | number | bigint | undefined | null): bigint => BigInt(value ?? 0)
