import { forwardRef, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        type='button'
        ref={ref}
        {...props}
        className={`${twMerge(
          'bg-primary font-bold p-2 rounded text-neutral-800 hover:bg-yellow-200',
          className
        )}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
