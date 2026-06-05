import type { ReactNode } from 'react';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag, { type TagType } from '../components/Tag';
import { useLanguage } from '../i18n/LanguageContext';

function ArchiveCard({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        {tag}
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export default function MistakeDetailPage() {
  const { t, tr } = useLanguage();
  const standardSteps = tr<string[]>('detail.standardSteps');
  const timeline = tr<[string, string, string, string][]>('detail.timeline');
  const hints = tr<[string, string, string][]>('detail.hints');
  const diagnosisRows = tr<[string, string][]>('detail.diagnosisRows');
  const abilityChanges = tr<[string, string, string][]>('detail.abilityChanges');

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Tag type="warning">{t('detail.mastery')}</Tag>
              <Tag type="danger">{t('detail.reasonTag')}</Tag>
              <Tag type="neutral">{t('detail.addedAt')}</Tag>
            </div>
            <h1 className="mt-4 font-display text-[32px] font-semibold tracking-tight text-ink">
              {t('detail.title')}
            </h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-ink/60">
              {t('detail.desc')}
            </p>
          </div>
          <AbilityMascot ability="translation" size="card" />

          <div className="flex shrink-0 flex-wrap justify-end gap-3">
            <PrimaryButton to="/practice">{t('detail.redo')}</PrimaryButton>
            <PrimaryButton to="/practice" variant="sun">
              {t('detail.variant')}
            </PrimaryButton>
            <SecondaryButton>{t('detail.mastered')}</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,820px)_280px]">
        <div className="space-y-6">
          <ArchiveCard title={t('detail.originalCard')} tag={<Tag type="info">{t('detail.originalTag')}</Tag>}>
            <p className="rounded-[1.5rem] bg-chalk p-5 text-lg font-semibold leading-8 text-ink/72">
              {t('detail.originalText')}
            </p>
          </ArchiveCard>

          <ArchiveCard title={t('detail.studentCard')} tag={<Tag type="warning">{t('detail.studentTag')}</Tag>}>
            <p className="rounded-[1.5rem] bg-readingSoft p-5 font-semibold leading-8 text-ink/68">
              {t('detail.studentText')}
            </p>
          </ArchiveCard>

          <ArchiveCard title={t('detail.standardCard')} tag={<Tag type="success">{t('detail.standardTag')}</Tag>}>
            <div className="mt-5 space-y-3">
              {standardSteps.map((step, index) => (
                <div
                  className="flex items-center gap-3 rounded-[1.35rem] border border-ink/5 bg-white p-4"
                  key={step}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-meadow text-sm font-medium text-leaf">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-ink/68">{step}</p>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard
            title={t('detail.retryCard')}
            tag={
              <div className="flex items-center gap-2">
                <AbilityMascot ability="calculation" size="card" />
                <Tag type="neutral">{t('detail.retryTag')}</Tag>
              </div>
            }
          >
            <textarea
              className="min-h-56 w-full resize-none rounded-[1.5rem] border border-ink/10 bg-chalk px-5 py-4 text-sm font-semibold leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15"
              placeholder={t('detail.retryPlaceholder')}
            />
            <div className="mt-4 flex gap-3">
              <PrimaryButton>{t('detail.submitRedo')}</PrimaryButton>
              <SecondaryButton>{t('detail.uploadHandwriting')}</SecondaryButton>
            </div>
          </ArchiveCard>
        </div>

        <aside className="space-y-6">
          <ArchiveCard title={t('detail.historyCard')} tag={<Tag type="danger">{t('detail.firstDiagnosis')}</Tag>}>
            <div className="mb-4 flex items-center gap-3">
              <AbilityMascot ability="translation" size="avatar" />
              <p className="rounded-2xl border border-ink/10 bg-translationSoft px-4 py-3 text-sm font-medium leading-6 text-ink/62">
                {t('detail.coachLine')}
              </p>
            </div>
            <div className="space-y-3">
              {diagnosisRows.map(([label, value]) => (
                <div
                  className="rounded-[1.35rem] border border-ink/5 bg-white p-4"
                  key={label}
                >
                  <p className="text-xs font-medium text-ink/42">{label}</p>
                  <p className="mt-1 font-medium leading-7 text-ink">{value}</p>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard title={t('detail.timelineCard')} tag={<Tag type="info">{t('detail.progressTag')}</Tag>}>
            <div className="relative space-y-5 pl-5">
              <div className="absolute bottom-4 left-[9px] top-4 w-px bg-ink/10" />
              {timeline.map(([date, title, detail, type]) => (
                <div className="relative" key={date}>
                  <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-white ring-4 ring-sky/25" />
                  <div className="rounded-[1.35rem] border border-ink/5 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-xl font-semibold text-ink">
                        {date}
                      </p>
                      <Tag type={type as TagType}>{title}</Tag>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink/62">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard title={t('detail.abilityCard')} tag={<Tag type="success">{t('detail.abilityTag')}</Tag>}>
            <p className="text-sm font-normal text-ink/55">{t('detail.abilityDesc')}</p>
            <div className="mt-4 space-y-3">
              {abilityChanges.map(([name, before, after]) => (
                <div className="rounded-[1.35rem] bg-calculationSoft p-4" key={name}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="font-display text-2xl font-semibold text-leaf">
                      {before} → {after}
                    </p>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white">
                    <div className="h-2.5 w-2/3 rounded-full bg-grass" />
                  </div>
                </div>
              ))}
            </div>
          </ArchiveCard>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Tag type="warning">{t('detail.hintsTag')}</Tag>
            <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
              {t('detail.hintsTitle')}
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-ink/55">
            {t('detail.hintsDesc')}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hints.map(([level, title, content], index) => (
            <details
              className="group rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-[0_8px_24px_rgba(52,63,76,0.05)] open:bg-translationSoft"
              key={level}
              open={index === 0}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <AbilityMascot
                    ability={
                      index === 0
                        ? 'reading'
                        : index === 1
                          ? 'translation'
                          : index === 2
                            ? 'model'
                            : 'review'
                    }
                    size="inline"
                  />
                  <span className="rounded-full bg-chalk px-3 py-1.5 text-xs font-medium text-ink/55 group-open:bg-sun/45 group-open:text-honey">
                    {level}
                  </span>
                  <span className="text-xs font-medium text-ink/35 group-open:text-honey">
                    {t('detail.open')}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {title}
                </h3>
              </summary>
              <p className="mt-4 text-sm font-semibold leading-7 text-ink/64">
                {content}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
