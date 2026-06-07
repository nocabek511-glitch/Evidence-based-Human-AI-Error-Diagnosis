import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { useLanguage } from '../i18n/LanguageContext';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const { t, tr } = useLanguage();
  const todayTasks = tr<[string, string, string][]>('home.tasks');
  const reviewMistakes = tr<[string, string, string][]>('home.mistakes');
  const adjustmentOptions = tr<string[]>('home.modalOptions');
  const statusItems = tr<[string, string][]>('home.statusItems');
  const [isAdjustOpen, setIsAdjustOpen] = useState(
    searchParams.get('figmaState') === 'adjust-plan',
  );
  const [selectedAdjustment, setSelectedAdjustment] = useState(
    adjustmentOptions[0],
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,820px)_280px]">
          <section className="min-w-0">
          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_188px]">
              <div>
                <Tag type="warning">{t('home.focusTag')}</Tag>
                <h1 className="mt-4 max-w-2xl text-[32px] font-semibold leading-tight tracking-tight text-ink">
                  {t('home.focusTitle')}
                </h1>
                <p className="mt-3 max-w-2xl text-[15px] font-normal leading-7 text-ink/62">
                  {t('home.focusDesc')}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <PrimaryButton to="/practice" className="px-7">
                    {t('home.start')}
                  </PrimaryButton>
                  <SecondaryButton onClick={() => setIsAdjustOpen(true)}>
                    {t('home.adjust')}
                  </SecondaryButton>
                </div>
              </div>

              <div className="hidden justify-self-center rounded-[1.75rem] bg-accent-focus p-4 shadow-[0_12px_28px_rgba(47,52,59,0.05)] md:block">
                <AbilityMascot ability="translation" size="hero" />
                <p className="mt-2 text-center text-xs font-medium leading-5 text-ink/55">
                  {t('home.mascotHint')
                    .split('\n')
                    .map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {todayTasks.map(([title, description, time], index) => (
                <div
                  className={`min-h-[118px] rounded-[1.35rem] border p-4 transition ${
                    index === 0
                      ? 'border-calculation/35 bg-accent-action shadow-[0_10px_24px_rgba(47,52,59,0.04)]'
                      : 'border-ink/8 bg-white'
                  }`}
                  key={title}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full text-sm font-medium ${
                        index === 0 ? 'bg-calculation text-ink' : 'bg-chalk'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="rounded-full bg-white/75 px-2.5 py-1 text-xs font-medium text-ink/50">
                      {time}
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold text-ink">
                    {title}
                  </p>
                  <p className="mt-1 text-sm font-normal leading-6 text-ink/52">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <aside className="self-start">
          <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <Tag type="success">{t('home.statusTitle')}</Tag>
            <div className="mt-4 space-y-2">
              {statusItems.map(([label, value]) => (
                <div
                  className="flex items-center justify-between rounded-2xl bg-chalk px-4 py-3"
                  key={label}
                >
                  <span className="text-sm font-medium text-ink/55">
                    {label}
                  </span>
                  <span className="text-base font-semibold text-ink">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-chalk">
              <div className="h-2.5 w-2/5 rounded-full bg-calculation" />
            </div>
            <SecondaryButton to="/plan" className="mt-4 w-full px-4 py-2">
              {t('home.adjustToday')}
            </SecondaryButton>
          </section>
        </aside>
        </div>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <Tag type="info">{t('home.recentReview')}</Tag>
                <Tag type="warning">{t('home.recentTag')}</Tag>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink">
                {t('home.recentTitle')}
              </h2>
              <p className="mt-3 rounded-2xl bg-accent-focus px-4 py-3 text-sm font-normal leading-6 text-ink/62">
                {t('home.recentDesc')}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <SecondaryButton to="/diagnosis">{t('home.viewReview')}</SecondaryButton>
                <PrimaryButton to="/practice">{t('home.practiceAgain')}</PrimaryButton>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <Tag type="neutral">{t('home.reviewMistakes')}</Tag>
                <SecondaryButton to="/mistakes" className="px-4 py-2">
                  {t('common.viewAll')}
                </SecondaryButton>
              </div>
              <div className="mt-4 space-y-2">
                {reviewMistakes.map(([title, reason, action]) => (
                  <div
                    className="grid grid-cols-1 gap-2 rounded-2xl bg-chalk px-4 py-3 sm:grid-cols-[1fr_78px_88px] sm:items-center"
                    key={title}
                  >
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="text-xs font-medium text-ink/50">{reason}</p>
                    <p className="text-xs font-medium text-ink/62">{action}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
      </div>

      {isAdjustOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/18 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[440px] rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag type="info">{t('home.modalTag')}</Tag>
                <h2 className="mt-3 text-xl font-semibold text-ink">
                  {t('home.modalTitle')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  {t('home.modalDesc')}
                </p>
              </div>
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={() => setIsAdjustOpen(false)}
                type="button"
              >
                {t('common.close')}
              </button>
            </div>

            <div className="mt-5 space-y-2">
              {adjustmentOptions.map((option) => (
                <button
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    selectedAdjustment === option
                      ? 'border-calculation/45 bg-accent-action text-ink'
                      : 'border-ink/8 bg-white text-ink/58 hover:bg-chalk'
                  }`}
                  key={option}
                  onClick={() => setSelectedAdjustment(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={() => setIsAdjustOpen(false)}>
                {t('home.originalPlan')}
              </SecondaryButton>
              <PrimaryButton onClick={() => setIsAdjustOpen(false)}>
                {t('home.confirmAdjust')}
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
