import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`${twMerge(
          'bg-transparent border-2 border-neutral-700 p-2 rounded-md text-white',
          className
        )}`}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
