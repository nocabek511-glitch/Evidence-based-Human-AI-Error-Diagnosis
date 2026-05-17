import { useState } from 'react';
import {
  abilityMascots,
  type Ability,
} from '../data/abilityMascots';

export type { Ability } from '../data/abilityMascots';

export type MascotSize =
  | 'tiny'
  | 'avatar'
  | 'inline'
  | 'card'
  | 'hero'
  | 'empty';

interface AbilityMascotProps {
  ability: Ability;
  size?: MascotSize;
  className?: string;
  alt?: string;
}

const sizeClass: Record<MascotSize, string> = {
  tiny: 'h-6 w-6',
  avatar: 'h-10 w-10',
  inline: 'h-14 w-14',
  card: 'h-[88px] w-[88px]',
  hero: 'h-32 w-32',
  empty: 'h-[180px] w-[180px]',
};

export default function AbilityMascot({
  ability,
  size = 'inline',
  className = '',
  alt,
}: AbilityMascotProps) {
  const [failed, setFailed] = useState(false);
  const meta = abilityMascots[ability];

  return (
    <div
      aria-label={alt ?? `${meta.label}学习伙伴`}
      className={`grid shrink-0 place-items-center ${sizeClass[size]} ${className}`}
      role="img"
    >
      {failed ? (
        <div className="grid h-full w-full place-items-center rounded-2xl border border-ink/10 bg-chalk px-2 text-center text-[10px] font-medium leading-tight text-ink/45">
          {meta.label}
        </div>
      ) : (
        <img
          alt={alt ?? `${meta.label}学习伙伴`}
          className="h-full w-full object-contain drop-shadow-[0_8px_14px_rgba(47,52,59,0.08)]"
          draggable={false}
          src={meta.image}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
