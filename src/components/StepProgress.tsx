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

const defaultSteps: Step[] = [
  { label: '读题理解', description: '读懂题目问什么' },
  { label: '条件转化', description: '把文字变成关系' },
  { label: '建立模型', description: '画图或列式建模' },
  { label: '方法选择', description: '选择合适路径' },
  { label: '计算执行', description: '稳住过程细节' },
  { label: '复核检查', description: '回看答案是否合理' },
];

export default function StepProgress({
  steps = defaultSteps,
  activeStep,
  activeSteps,
  current,
  title,
  subtitle,
}: StepProgressProps) {
  const highlightedSteps =
    activeSteps ?? [activeStep ?? current ?? 0];
  const firstHighlightedStep = Math.min(...highlightedSteps);
  const usesDefaultSteps = steps === defaultSteps;
  const resolvedTitle =
    title ?? (usesDefaultSteps ? '解题流程断链定位' : '今日闯关路线');
  const resolvedSubtitle =
    subtitle ??
    (usesDefaultSteps
      ? '高亮的位置表示当前最容易卡住的一步。'
      : '高亮的位置表示当前正在进行的小任务。');

  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-lagoon">
            Step Check
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">
            {resolvedTitle}
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink/55">
            {resolvedSubtitle}
          </p>
        </div>
        <span className="rounded-full border border-translation/25 bg-translationSoft px-4 py-2 text-sm font-medium text-ink/70">
          断链 {highlightedSteps.map((step) => step + 1).join('、')}/{steps.length}
        </span>
      </div>

      <div className="flex items-start">
        {steps.map((step, index) => {
          const isActive = highlightedSteps.includes(index);
          const isDone = index < firstHighlightedStep;
          const state = isActive ? 'active' : isDone ? 'done' : 'next';

          return (
            <div className="flex flex-1 items-start" key={step.label}>
              <div className="flex min-w-[124px] flex-col items-center text-center">
                <div
                  className={`grid h-[52px] w-[52px] place-items-center rounded-full border-4 text-base font-semibold transition ${
                    state === 'done'
                      ? 'border-calculation/20 bg-calculationSoft text-ink/65 shadow-[0_4px_14px_rgba(52,63,76,0.06)]'
                      : state === 'active'
                        ? 'animate-pop-in border-translation/30 bg-translationSoft text-ink shadow-[0_4px_14px_rgba(52,63,76,0.10)] ring-4 ring-translation/15'
                        : 'border-ink/5 bg-chalk text-ink/35'
                  }`}
                >
                  {state === 'done' ? '✓' : index + 1}
                </div>
                <p
                  className={`mt-3 text-sm font-medium ${
                    isActive ? 'text-ink' : 'text-ink'
                  }`}
                >
                  {step.label}
                </p>
                {step.description ? (
                  <p className="mt-1 max-w-32 text-xs leading-5 text-ink/50">
                    {step.description}
                  </p>
                ) : null}
              </div>

              {index !== steps.length - 1 ? (
                <div className="relative mt-6 h-3 flex-1 rounded-full bg-chalk">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      index < firstHighlightedStep
                        ? 'w-full bg-calculation'
                        : highlightedSteps.includes(index) ||
                            highlightedSteps.includes(index + 1)
                          ? 'w-full bg-translation'
                          : 'w-1/3 bg-ink/10'
                    }`}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
