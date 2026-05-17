import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  to?: string;
  className?: string;
};

export default function SecondaryButton({
  children,
  to,
  className = '',
  type = 'button',
  disabled,
  ...buttonProps
}: SecondaryButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-[0_4px_14px_rgba(47,52,59,0.035)] transition duration-200 hover:-translate-y-0.5 hover:bg-chalk active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-review disabled:cursor-not-allowed disabled:opacity-60 ${className}`;

  if (to) {
    return (
      <Link
        aria-disabled={disabled}
        className={classes}
        tabIndex={disabled ? -1 : undefined}
        to={disabled ? '#' : to}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
