import { useLanguage } from '../i18n/LanguageContext';

type Step = {
  label: string;
  description?: string;
};

type StepProgressProps = {
  steps?: Step[];
  activeStep?: number;
  activeSteps?: number[];
  current?: number;
  title?: string;
  subtitle?: string;
};

export default function StepProgress({
  steps,
  activeStep,
  activeSteps,
  current,
  title,
  subtitle,
}: StepProgressProps) {
  const { t, tr } = useLanguage();
  const defaultSteps = tr<[string, string][]>('components.steps').map(
    ([label, description]) => ({ label, description }),
  );
  const resolvedSteps = steps ?? defaultSteps;
  const highlightedSteps = activeSteps ?? [activeStep ?? current ?? 0];
  const resolvedTitle = title ?? t('components.defaultStepTitle');
  const resolvedSubtitle = subtitle ?? t('components.defaultStepSubtitle');

  return (
    <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/35">
          {t('components.stepCheck')}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-ink">{resolvedTitle}</h3>
        <p className="mt-1 text-sm font-normal text-ink/52">{resolvedSubtitle}</p>
      </div>

      <div className="space-y-2.5">
        {resolvedSteps.map((step, index) => {
          const isActive = highlightedSteps.includes(index);
          const isDone = index < Math.min(...highlightedSteps);

          return (
            <div
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
                isActive
                  ? 'border-translation/30 bg-accent-focus'
                  : isDone
                    ? 'border-calculation/20 bg-calculationSoft'
                    : 'border-ink/8 bg-chalk'
              }`}
              key={step.label}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-ink/65 shadow-[inset_0_0_0_1px_rgba(47,52,59,0.06)]">
                {isDone ? '✓' : index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{step.label}</p>
                {step.description ? (
                  <p className="mt-0.5 text-xs leading-5 text-ink/45">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
