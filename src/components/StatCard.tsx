import type { ReactNode } from 'react';
import Tag, { type TagType } from './Tag';

type StatCardProps = {
  title: string;
  value: ReactNode;
  description?: string;
  trend?: string;
  trendType?: TagType;
  icon?: string;
  className?: string;
};

const iconBg: Record<TagType, string> = {
  danger: 'bg-readingSoft text-ink/70',
  warning: 'bg-modelingSoft text-ink/70',
  success: 'bg-calculationSoft text-ink/70',
  info: 'bg-reviewSoft text-ink/70',
  neutral: 'bg-chalk text-ink/60',
};

export default function StatCard({
  title,
  value,
  description,
  trend,
  trendType = 'success',
  icon = '•',
  className = '',
}: StatCardProps) {
  return (
    <article
      className={`rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-[52px] w-[52px] place-items-center rounded-[1.4rem] text-xl ${iconBg[trendType]}`}
        >
          {icon}
        </div>
        {trend ? <Tag type={trendType}>{trend}</Tag> : null}
      </div>

      <p className="mt-5 text-sm font-medium text-ink/50">{title}</p>
      <strong className="mt-2 block font-display text-[28px] font-semibold tracking-tight text-ink">
        {value}
      </strong>
      {description ? (
        <p className="mt-3 text-sm font-semibold leading-6 text-ink/60">
          {description}
        </p>
      ) : null}
    </article>
  );
}
