import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

export type FigmaDiagnosisState =
  | 'dispute-basis'
  | 'dispute-filled'
  | 'dispute-submitted'
  | 'dispute-validation'
  | 'dispute-result';

type FigmaDiagnosisStateDrawerProps = {
  state: FigmaDiagnosisState;
};

const directions = [
  '题目没看清',
  '条件没写成式子',
  '模型没建起来',
  '方法没选对',
  '后面计算出了问题',
  '做完没有检查',
  '我不确定',
];

const validationTasks = [
  {
    title: '小验证 1',
    description: '从题干中找出“售价变化”和“销量变化”的对应关系。',
    passed: true,
  },
  {
    title: '小验证 2',
    description: '判断销量关系应该写成 10 + x 还是 10 + 5x。',
    passed: true,
  },
  {
    title: '小验证 3',
    description: '解释为什么关系式里需要保留 5 倍变化。',
    passed: false,
  },
];

export default function FigmaDiagnosisStateDrawer({
  state,
}: FigmaDiagnosisStateDrawerProps) {
  const isBasis = state === 'dispute-basis';
  const isFilled = state === 'dispute-filled';
  const isSubmitted = state === 'dispute-submitted';
  const isValidation = state === 'dispute-validation';
  const isResult = state === 'dispute-result';

  const title = isValidation
    ? '做一个小验证'
    : isResult
      ? '重新校准结果'
      : '你觉得不是这里？';

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-ink/18 backdrop-blur-sm">
      <aside className="flex h-full w-full max-w-[600px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)] sm:min-w-[520px]">
        <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
          <div>
            <Tag type="info">Figma 捕捉状态</Tag>
            <h2 className="mt-3 text-xl font-semibold text-ink">{title}</h2>
            {isValidation ? (
              <p className="mt-2 text-sm leading-6 text-ink/52">
                我们用三道小任务确认真正卡点。
              </p>
            ) : null}
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm text-ink/40">
            ×
          </span>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {isBasis || isFilled ? (
            <>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                可以，我们重新看。先说说你觉得真正卡在哪里，再补一句依据。
              </div>

              <section>
                <p className="mb-2 text-xs font-medium text-ink/42">
                  你觉得真正卡在哪？
                </p>
                <div className="flex flex-wrap gap-2">
                  {directions.map((option) => (
                    <button
                      className={`rounded-full border px-3.5 py-2 text-xs font-medium ${
                        isFilled && option === '后面计算出了问题'
                          ? 'border-calculation/40 bg-accent-action text-ink'
                          : 'border-ink/10 bg-white text-ink/55'
                      }`}
                      key={option}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-medium text-ink/42">
                  你的依据是什么？
                </p>
                <textarea
                  className="min-h-32 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none placeholder:text-ink/35"
                  placeholder="例如：我已经写出了销量关系，问题是在后面展开计算时算错了。"
                  readOnly
                  value={
                    isFilled
                      ? '我已经写出了销量关系，问题是在后面展开计算的时候算错了。'
                      : ''
                  }
                />
              </section>
            </>
          ) : null}

          {isSubmitted ? (
            <>
              <div className="rounded-[1.5rem] bg-accent-focus px-4 py-4 text-sm leading-7 text-ink/68">
                已收到你的依据。系统会重新比较你的原始步骤、当前说明和这道题的关键断点。
              </div>
              <section className="rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                <p className="text-xs font-medium text-ink/38">你补充的判断</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                  真正问题在后面计算，不是条件没写成式子。
                </p>
                <p className="mt-3 rounded-2xl bg-chalk px-4 py-3 text-sm leading-6 text-ink/56">
                  我已经写出了销量关系，问题是在后面展开计算的时候算错了。
                </p>
              </section>
              <section className="rounded-[1.5rem] border border-translation/20 bg-accent-focus/65 p-4">
                <p className="text-xs font-medium text-ink/38">当前判断</p>
                <p className="mt-2 text-base font-semibold leading-7 text-ink">
                  原断点仍可能在“条件转化”，但你的说明会降低该判断的确定程度。
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/58">
                  下一步可以用两三道微任务继续确认，或者回到原步骤查看完整解法。
                </p>
              </section>
            </>
          ) : null}

          {isValidation ? (
            <section className="rounded-[1.5rem] border border-ink/8 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ink">本次只看这个断点</p>
                <span className="rounded-full bg-accent-action px-3 py-1 text-xs font-medium text-ink/60">
                  2/3 通过
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {validationTasks.map((task) => (
                  <article
                    className="rounded-2xl border border-ink/8 bg-chalk/65 px-4 py-3"
                    key={task.title}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {task.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink/55">
                          {task.description}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          task.passed
                            ? 'bg-accent-action text-ink/68'
                            : 'bg-white text-ink/40'
                        }`}
                      >
                        {task.passed ? '通过' : '未通过'}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        className="rounded-full border border-calculation/30 bg-accent-action px-3 py-1.5 text-xs font-medium text-ink"
                        type="button"
                      >
                        通过
                      </button>
                      <button
                        className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/50"
                        type="button"
                      >
                        未通过
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {isResult ? (
            <>
              <section className="rounded-[1.5rem] border border-calculation/20 bg-accent-action/70 p-4">
                <Tag type="success">临时校准</Tag>
                <h3 className="mt-3 text-xl font-semibold text-ink">
                  验证结果：2 / 3 通过
                </h3>
                <p className="mt-4 rounded-2xl bg-white/80 px-4 py-4 text-base font-semibold leading-7 text-ink/72">
                  系统更新：本题断点从“条件转化”调整为“计算展开需复核”（临时）
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/62">
                  你的补充说明和小验证表现显示，你可能已经理解了销量关系，但在后续计算展开中不稳定。因此系统会把这次判断作为临时校准，后续练习继续确认。
                </p>
              </section>
              <div className="rounded-[1.5rem] border border-ink/8 bg-white p-4">
                <p className="text-xs font-medium text-ink/38">当前记录</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent-action px-3 py-1.5 text-xs font-medium text-ink/62">
                    主断点：计算展开需复核
                  </span>
                  <span className="rounded-full bg-accent-warning px-3 py-1.5 text-xs font-medium text-ink/62">
                    状态：临时
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          <div className="flex flex-wrap justify-end gap-3">
            {isBasis || isFilled ? (
              <>
                <SecondaryButton>先返回</SecondaryButton>
                <PrimaryButton>提交校准</PrimaryButton>
              </>
            ) : null}
            {isSubmitted ? (
              <>
                <SecondaryButton>返回诊断</SecondaryButton>
                <SecondaryButton>查看完整解法</SecondaryButton>
                <PrimaryButton>做 2 道小验证</PrimaryButton>
              </>
            ) : null}
            {isValidation ? (
              <>
                <SecondaryButton>返回诊断</SecondaryButton>
                <PrimaryButton>完成验证</PrimaryButton>
              </>
            ) : null}
            {isResult ? (
              <>
                <SecondaryButton>返回诊断</SecondaryButton>
                <SecondaryButton>我还想再确认</SecondaryButton>
                <PrimaryButton>去练这一块</PrimaryButton>
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
