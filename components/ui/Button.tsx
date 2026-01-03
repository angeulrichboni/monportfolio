import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 border border-transparent',
        secondary: 'bg-neutral-800 text-white hover:bg-neutral-700 border border-transparent shadow-sm',
        outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 shadow-sm',
        ghost: 'text-neutral-600 hover:text-blue-600 hover:bg-blue-50',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Fallback spinner if strictly needed, but kept simple for now */}
            {isLoading && <span className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />}
            {children}
        </button>
    );
};
