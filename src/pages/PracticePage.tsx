import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AbilityMascot from '../components/AbilityMascot';
import ChallengeConversationDrawer from '../components/ChallengeConversationDrawer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { useLanguage } from '../i18n/LanguageContext';

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const figmaState = searchParams.get('figmaState');
  const { t, tr } = useLanguage();
  const firstStepOptions = tr<string[]>('practice.firstOptions');
  const startMethods = tr<string[]>('practice.startMethods');
  const helpOptions = tr<[string, string][]>('practice.helpOptions');
  const feedbackActions = tr<string[]>('practice.feedbackActions');
  const methodQuestions = tr<string[]>('practice.methodQuestions');
  const [selectedFirstStep, setSelectedFirstStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [helpOpen, setHelpOpen] = useState(figmaState === 'hint-open');
  const [selectedHelp, setSelectedHelp] = useState(1);
  const [feedbackVisible, setFeedbackVisible] = useState(
    figmaState === 'result',
  );
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);
  const [methodResultVisible, setMethodResultVisible] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,820px)_280px]">
        <main className="space-y-5">
          <section className="rounded-[2rem] border border-translation/20 bg-white p-6 shadow-card ring-4 ring-translation/10">
            <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_140px]">
              <div>
                <Tag type="info">{t('practice.goalTag')}</Tag>
                <h1 className="mt-4 text-[32px] font-semibold tracking-tight text-ink">
                  {t('practice.goalTitle')}
                </h1>
                <p className="mt-3 max-w-2xl text-[15px] font-normal leading-7 text-ink/60">
                  {t('practice.goalDesc')}
                </p>
              </div>
              <div className="hidden rounded-[1.5rem] bg-accent-focus p-3 md:block">
                <AbilityMascot ability="translation" size="card" />
                <p className="mt-2 text-center text-xs font-medium leading-5 text-ink/55">
                  {t('practice.mascotHint')
                    .split('\n')
                    .map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </section>

          <article className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <Tag type="warning">{t('practice.problemTag')}</Tag>
              <span className="rounded-full bg-accent-warning px-3 py-1 text-xs font-medium text-ink/60">
                {t('practice.level')}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-ink">
              {t('practice.problemTitle')}
            </h2>
            <p className="mt-4 rounded-[1.5rem] border border-ink/8 bg-white p-5 text-base font-normal leading-8 text-ink/70 shadow-[inset_4px_0_0_#FFD997]">
              {t('practice.problemText')}
            </p>

            <div className="mt-5 rounded-[1.5rem] border border-ink/8 bg-chalk p-4">
              <p className="text-sm font-semibold text-ink">
                {t('practice.firstQuestion')}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {firstStepOptions.map((option, index) => (
                  <button
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedFirstStep === index
                        ? 'border-calculation/40 bg-accent-action text-ink'
                        : 'border-ink/10 bg-white text-ink/55 hover:text-ink/75'
                    }`}
                    key={option}
                    onClick={() => setSelectedFirstStep(index)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tag type="success">{t('practice.workTag')}</Tag>
              <span className="rounded-full bg-accent-action px-4 py-2 text-sm font-medium text-ink/55">
                {t('practice.switchWay')}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {startMethods.map((method, index) => (
                <button
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    selectedMethod === index
                      ? 'border-calculation/35 bg-accent-action text-ink'
                      : 'border-ink/10 bg-white text-ink/55 hover:bg-chalk'
                  }`}
                  key={method}
                  onClick={() => setSelectedMethod(index)}
                  type="button"
                >
                  <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-white text-xs text-ink/55">
                    {index + 1}
                  </span>
                  {method}
                </button>
              ))}
            </div>

            <textarea
              className="mt-5 min-h-[240px] w-full resize-none rounded-[1.5rem] border border-ink/10 bg-chalk px-5 py-4 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
              placeholder={t('practice.placeholder')}
            />
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={() => setHelpOpen(true)}>
                {t('practice.stuck')}
              </SecondaryButton>
              <PrimaryButton onClick={() => setFeedbackVisible(true)}>
                {t('practice.submit')}
              </PrimaryButton>
            </div>
          </article>

          {feedbackVisible ? (
            <section className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <Tag type="info">{t('practice.feedbackTag')}</Tag>
                <button
                  className="rounded-full bg-chalk px-4 py-2 text-xs font-medium text-ink/50"
                  onClick={() => setFeedbackVisible(false)}
                  type="button"
                >
                  {t('common.collapse')}
                </button>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-ink">
                {t('practice.feedbackTitle')}
              </h2>
              <p className="mt-3 rounded-[1.5rem] bg-accent-focus px-5 py-4 text-sm leading-7 text-ink/64">
                {t('practice.feedbackDesc')}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {feedbackActions.map((action, index) => (
                  <button
                    className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink/58 transition hover:bg-chalk hover:text-ink/75"
                    key={action}
                    onClick={() => {
                      if (index === 1) {
                        setEvidenceOpen(true);
                      }
                      if (index === 3) {
                        setMethodOpen(true);
                      }
                    }}
                    type="button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {methodResultVisible ? (
            <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
              <Tag type="warning">{t('practice.methodTitle')}</Tag>
              <p className="mt-4 text-sm leading-7 text-ink/58">
                {t('practice.methodResult')}
              </p>
            </section>
          ) : null}

          {feedbackVisible ? (
            <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Tag type="neutral">{t('practice.oldTag')}</Tag>
                  <p className="mt-3 text-sm leading-6 text-ink/55">
                    {t('practice.oldDesc')}
                  </p>
                </div>
                <SecondaryButton to="/mistakes/1">
                  {t('practice.oldButton')}
                </SecondaryButton>
              </div>
            </section>
          ) : null}
        </main>

        <aside className="space-y-5 self-start">
          <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <Tag type="info">{t('practice.helpTag')}</Tag>
            <p className="mt-4 text-sm font-normal leading-6 text-ink/55">
              {t('practice.helpDesc')}
            </p>
            <PrimaryButton
              className="mt-4 w-full"
              onClick={() => setHelpOpen((value) => !value)}
              variant="secondary"
            >
              {t('practice.chooseHint')}
            </PrimaryButton>

            {helpOpen ? (
              <div className="mt-4 space-y-2">
                {helpOptions.map(([label], index) => (
                  <button
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedHelp === index
                        ? 'border-translation/25 bg-accent-focus text-ink'
                        : 'border-ink/10 bg-white text-ink/55 hover:bg-chalk'
                    }`}
                    key={label}
                    onClick={() => setSelectedHelp(index)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
                <p className="rounded-2xl bg-chalk p-4 text-sm leading-6 text-ink/58">
                  {helpOptions[selectedHelp]?.[1]}
                </p>
                <div className="grid gap-2">
                  <PrimaryButton onClick={() => setHelpOpen(false)} variant="secondary">
                    {t('practice.hintContinue')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() =>
                      setSelectedHelp((value) => (value + 1) % helpOptions.length)
                    }
                  >
                    {t('practice.changeHint')}
                  </SecondaryButton>
                  <SecondaryButton>{t('practice.stillStuck')}</SecondaryButton>
                </div>
              </div>
            ) : null}
          </section>

          <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <Tag type="warning">{t('practice.reminderTag')}</Tag>
            <p className="mt-4 text-sm font-normal leading-6 text-ink/58">
              {t('practice.reminder')}
            </p>
          </section>
        </aside>
      </div>

      <ChallengeConversationDrawer
        currentJudgment={t('challengeDrawer.issueLabels.translation')}
        onClose={() => setEvidenceOpen(false)}
        onReadyToRejudge={() => setFeedbackVisible(true)}
        open={evidenceOpen}
      />

      {methodOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/18 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag type="info">{t('practice.methodTitle')}</Tag>
                <h2 className="mt-3 text-xl font-semibold text-ink">
                  {t('practice.methodTitle')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  {t('practice.methodDesc')}
                </p>
              </div>
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={() => setMethodOpen(false)}
                type="button"
              >
                {t('common.close')}
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {methodQuestions.map((question) => (
                <label className="block" key={question}>
                  <span className="text-sm font-medium text-ink/62">{question}</span>
                  <textarea className="mt-2 min-h-20 w-full resize-none rounded-2xl border border-ink/10 bg-chalk px-4 py-3 text-sm leading-6 outline-none focus:border-calculation focus:bg-white" />
                </label>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={() => setMethodOpen(false)}>
                {t('practice.backEdit')}
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  setMethodOpen(false);
                  setMethodResultVisible(true);
                }}
              >
                {t('practice.methodSubmit')}
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
