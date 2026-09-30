import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variants = {
  primary: 'bg-bpi-red text-white hover:bg-bpi-red-dark active:bg-bpi-red-dark disabled:opacity-50',
  secondary: 'border border-bpi-red text-bpi-red hover:bg-bpi-red hover:text-white',
  ghost: 'text-bpi-text hover:bg-bpi-gray',
} as const

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type}
      className={cn('inline-flex items-center justify-center px-4 py-2 font-heading text-xs font-extrabold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bpi-red', variants[variant], className)}
      {...props} />
  )
}
