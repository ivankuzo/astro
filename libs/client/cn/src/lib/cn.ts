import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type WithClassName = {
    className?: ClassValue
}

export const cn = (...args: ClassValue[]) => twMerge(clsx(args))
