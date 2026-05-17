import type { ReactNode } from 'react';
import AbilityMascot, { type Ability } from './AbilityMascot';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

type EmptyStateProps = {
  title: string;
  description?: string;
  ability?: Ability;
  actionLabel?: string;
  actionTo?: string;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
  children?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  ability = 'reading',
  actionLabel,
  actionTo,
  secondaryActionLabel,
  secondaryActionTo,
  children,
  className = '',
}: EmptyStateProps) {
  return (
    <section
      className={`grid min-h-[360px] place-items-center rounded-[2rem] border-2 border-dashed border-calculation/25 bg-white p-8 text-center shadow-card ${className}`}
    >
      <div className="max-w-lg">
        <AbilityMascot ability={ability} className="mx-auto" size="empty" />
        <h3 className="mt-6 font-display text-[28px] font-semibold text-ink">
          {title}
        </h3>
        {description ? (
          <p className="mt-3 font-semibold leading-7 text-ink/60">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
        {actionLabel || secondaryActionLabel ? (
          <div className="mt-8 flex justify-center gap-3">
            {actionLabel ? (
              <PrimaryButton to={actionTo}>{actionLabel}</PrimaryButton>
            ) : null}
            {secondaryActionLabel ? (
              <SecondaryButton to={secondaryActionTo}>
                {secondaryActionLabel}
              </SecondaryButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
