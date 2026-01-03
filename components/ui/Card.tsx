import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    variant?: 'default' | 'bordered' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
    className,
    hoverEffect = false,
    variant = 'default',
    children,
    ...props
}) => {
    const variants = {
        default: 'rounded-2xl border border-neutral-200 bg-white shadow-sm',
        bordered: 'rounded-2xl border-2 border-neutral-200 bg-white',
        elevated: 'rounded-2xl bg-white shadow-lg shadow-neutral-200/50',
    };

    return (
        <div
            className={cn(
                'relative overflow-hidden p-6',
                variants[variant],
                hoverEffect && 'transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/30 hover:-translate-y-1 hover:border-blue-300',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
