import type { ReactNode } from 'react';

export type TagType = 'danger' | 'warning' | 'success' | 'info' | 'neutral';

type LegacyTone =
  | 'mint'
  | 'grass'
  | 'coral'
  | 'sun'
  | 'sky'
  | 'peach'
  | 'neutral';

type TagProps = {
  children: ReactNode;
  type?: TagType;
  tone?: LegacyTone;
  icon?: string;
  className?: string;
};

const typeClass: Record<TagType, string> = {
  danger: 'border-reading/25 bg-readingSoft text-ink/72',
  warning: 'border-modeling/35 bg-modelingSoft text-ink/72',
  success: 'border-calculation/30 bg-calculationSoft text-ink/72',
  info: 'border-review/30 bg-reviewSoft text-ink/72',
  neutral: 'border-ink/10 bg-chalk text-ink/58',
};

const legacyToneToType: Record<LegacyTone, TagType> = {
  mint: 'success',
  grass: 'success',
  coral: 'danger',
  peach: 'danger',
  sun: 'warning',
  sky: 'info',
  neutral: 'neutral',
};

export default function Tag({
  children,
  type,
  tone,
  icon,
  className = '',
}: TagProps) {
  const resolvedType = type ?? (tone ? legacyToneToType[tone] : 'neutral');

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${typeClass[resolvedType]} ${className}`}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  );
}
