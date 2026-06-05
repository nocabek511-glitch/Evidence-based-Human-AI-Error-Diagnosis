import AbilityMascot, { type Ability } from '../components/AbilityMascot';
import MistakeCard, { type MistakeStatus } from '../components/MistakeCard';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { useLanguage } from '../i18n/LanguageContext';

const reasonBuddy: Record<string, Ability> = {
  读题理解: 'reading',
  Understanding: 'reading',
  条件转化: 'translation',
  Translation: 'translation',
  建立模型: 'model',
  Modeling: 'model',
  方法选择: 'method',
  Strategy: 'method',
  计算执行: 'calculation',
  Execution: 'calculation',
  复核检查: 'review',
  Checking: 'review',
};

export default function MistakeBookPage() {
  const { t, tr } = useLanguage();
  const quickFilters = tr<string[]>('mistakes.quick');
  const filterGroups = tr<[string, string[]][]>('mistakes.groups');
  const mistakeCards = tr<string[][]>('mistakes.cards').map((item, index) => ({
    id: index + 1,
    title: item[0],
    knowledgePoint: item[1],
    mainReason: item[2],
    brokenStep: item[3],
    mastery: item[4],
    lastPracticedAt: item[5],
    practiceCount: Number(item[6]),
    status: item[7] as MistakeStatus,
  }));

  return (
    <div className="space-y-5">
      <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <Tag type="info">{t('mistakes.heroTag')}</Tag>
            <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-ink">
              {t('mistakes.title')}
            </h1>
            <p className="mt-2 text-sm font-normal leading-6 text-ink/55">
              {t('mistakes.desc')}
            </p>
          </div>

          <label className="relative block w-full max-w-[340px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink/35">
              {t('common.searchShort')}
            </span>
            <input
              className="h-11 w-full rounded-full border border-ink/10 bg-chalk pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white"
              placeholder={t('mistakes.search')}
              type="search"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {quickFilters.map((filter, index) => (
            <button
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                index === 0
                  ? 'border-calculation/30 bg-calculationSoft text-ink'
                  : 'border-ink/10 bg-white text-ink/48 hover:bg-chalk hover:text-ink/70'
              }`}
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,820px)]">
        <aside className="sticky top-0 max-h-[calc(100vh-150px)] self-start overflow-y-auto rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-[0_6px_18px_rgba(47,52,59,0.03)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">{t('mistakes.filter')}</h2>
            <button className="text-sm font-medium text-ink/40 hover:text-ink" type="button">
              {t('mistakes.clear')}
            </button>
          </div>

          <div className="mt-5 space-y-6">
            {filterGroups.map(([title, items]) => (
              <div key={title}>
                <p className="text-sm font-medium text-ink/45">{title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <button
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition hover:bg-chalk ${
                        index === 0
                          ? 'border-calculation/25 bg-calculationSoft text-ink'
                          : 'border-ink/10 bg-white text-ink/50'
                      }`}
                      key={item}
                      type="button"
                    >
                      {reasonBuddy[item] ? (
                        <AbilityMascot ability={reasonBuddy[item]} size="tiny" />
                      ) : null}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <div>
              <h2 className="text-xl font-semibold text-ink">{t('mistakes.countTitle')}</h2>
              <p className="mt-1 text-sm text-ink/50">
                {t('mistakes.countDesc')}
              </p>
            </div>
            <SecondaryButton to="/upload">{t('mistakes.uploadNew')}</SecondaryButton>
          </div>

          {mistakeCards.map((mistake) => (
            <MistakeCard
              brokenStep={mistake.brokenStep}
              detailTo={`/mistakes/${mistake.id}`}
              key={mistake.id}
              knowledgePoint={mistake.knowledgePoint}
              lastPracticedAt={mistake.lastPracticedAt}
              mainReason={mistake.mainReason}
              mastery={mistake.mastery}
              practiceCount={mistake.practiceCount}
              retryTo="/practice"
              status={mistake.status}
              title={mistake.title}
              variantTo="/practice"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
