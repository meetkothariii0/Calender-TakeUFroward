'use client'

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-quick focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garden-green-bright focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants: Record<string, string> = {
      default: "bg-garden-green-bright text-garden-cream hover:bg-garden-olive hover:scale-105 shadow-subtle hover:shadow-md",
      ghost: "text-garden-text hover:bg-garden-mint-light/50",
      outline: "border-2 border-garden-green-bright text-garden-green-bright hover:bg-garden-mint-light/30"
    }

    const sizes: Record<string, string> = {
      default: "px-lg py-md text-sm",
      sm: "px-md py-xs text-xs",
      lg: "px-2xl py-lg text-base",
      icon: "h-8 w-8"
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
