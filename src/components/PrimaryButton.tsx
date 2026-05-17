import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'sun';
  className?: string;
};

const variants: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  primary:
    'border border-calculation/40 bg-calculation text-ink shadow-button hover:bg-calculationSoft hover:shadow-button-hover focus-visible:outline-calculation',
  secondary:
    'border border-reading/35 bg-readingSoft text-ink shadow-button hover:bg-white hover:shadow-button-hover focus-visible:outline-reading',
  sun: 'border border-modeling/45 bg-modelingSoft text-ink shadow-button hover:bg-white hover:shadow-button-hover focus-visible:outline-modeling',
  ghost:
    'border border-ink/10 bg-white text-ink shadow-[0_4px_14px_rgba(47,52,59,0.05)] hover:bg-chalk focus-visible:outline-review',
};

export default function PrimaryButton({
  children,
  to,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
  ...buttonProps
}: PrimaryButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

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
