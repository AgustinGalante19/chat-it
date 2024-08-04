import { forwardRef, AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, target, children, className, ...props }, ref) => {
    return (
      <a
        href={href}
        ref={ref}
        {...props}
        className={twMerge(
          'bg-primary font-bold p-2 rounded text-neutral-800 hover:bg-yellow-200',
          className
        )}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'CustomLink';

export default Link;
