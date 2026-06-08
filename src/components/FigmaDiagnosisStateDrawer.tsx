import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

export type FigmaDiagnosisState =
  | 'dispute-basis'
  | 'dispute-filled'
  | 'dispute-submitted'
  | 'dispute-validation'
  | 'dispute-result'
  | 'dispute-start'
  | 'dispute-review'
  | 'dispute-supplement'
  | 'dispute-supplement-review'
  | 'dispute-recorded'
  | 'dispute-recorded-evidence'
  | 'dispute-record-updated';

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

const supplementText =
  '我第二步的步骤确实写错了，但是我是粗心，不是不会做。';

function ReviewContent({ withSupplement }: { withSupplement: boolean }) {
  return (
    <section className="space-y-4">
      <div className="rounded-[1.5rem] border border-translation/15 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
        <p className="text-xs font-medium text-ink/38">你提出的判断</p>
        <p className="mt-2 text-sm leading-7 text-ink/66">
          你认为：真正问题在
          <span className="font-semibold text-ink"> 后面计算出了问题</span>
          ，不是
          <span className="font-semibold text-ink"> 条件没写成式子</span>。
        </p>
        {withSupplement ? (
          <p className="mt-3 rounded-2xl bg-accent-warning/60 px-4 py-3 text-sm leading-6 text-ink/60">
            补充：{supplementText}
          </p>
        ) : null}
      </div>

      <div className="rounded-[1.5rem] border border-ink/8 bg-chalk/75 p-4">
        <p className="text-sm font-semibold text-ink">我们放回步骤里看一下</p>
        <p className="mt-3 text-sm leading-7 text-ink/62">
          后面计算确实受到了影响，但放回你的原步骤看，最早开始偏的位置还是第
          2
          步的“销量变化关系”。后面的计算更像是被前一步带偏了。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-[1.35rem] border border-translation/20 bg-accent-focus px-4 py-3">
          <p className="text-xs font-medium text-ink/38">你写成了</p>
          <p className="mt-2 text-lg font-semibold text-ink">销量 = 10 + x</p>
        </div>
        <div className="hidden items-center justify-center text-ink/28 sm:flex">
          →
        </div>
        <div className="rounded-[1.35rem] border border-calculation/20 bg-accent-action px-4 py-3">
          <p className="text-xs font-medium text-ink/38">应该先写成</p>
          <p className="mt-2 text-lg font-semibold text-ink">
            销量 = 10 + 5x
          </p>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-calculation/20 bg-white p-4">
        <p className="text-xs font-medium text-ink/38">当前建议记录</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent-focus px-3 py-1.5 text-xs font-medium text-ink/62">
            主断点：条件转化
          </span>
          <span className="rounded-full bg-accent-warning px-3 py-1.5 text-xs font-medium text-ink/62">
            受影响步骤：计算执行
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/54">
          后面计算不是完全独立出错，而是沿着前面关系式继续算。
        </p>
      </div>
    </section>
  );
}

function RecordedModal({ evidenceOpen = false }: { evidenceOpen?: boolean }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/18 px-4 backdrop-blur-sm">
      <section className="w-full max-w-[470px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Tag type="success">记录完成</Tag>
            <h2 className="mt-4 text-[22px] font-semibold leading-8 tracking-tight text-ink">
              这题记录好了
            </h2>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm text-ink/40">
            ×
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-chalk px-4 py-3">
            <p className="text-xs font-medium text-ink/38">本题记录</p>
            <p className="mt-1 text-sm leading-6 text-ink/62">
              这题会记为：主断点：条件转化；受影响步骤：计算执行。
            </p>
          </div>
          <div className="rounded-2xl bg-accent-action px-4 py-3">
            <p className="text-xs font-medium text-ink/38">接下来</p>
            <p className="mt-1 text-sm leading-6 text-ink/68">
              你提出的“后面计算也受影响”会一起记录进去。
            </p>
          </div>
        </div>

        <button
          className="mt-4 text-sm font-medium text-ink/50 underline decoration-ink/20 underline-offset-4"
          type="button"
        >
          {evidenceOpen ? '收起依据' : '查看依据'}
        </button>

        {evidenceOpen ? (
          <div className="mt-3 rounded-2xl border border-ink/8 bg-white px-4 py-3 text-sm leading-6 text-ink/58">
            <p className="text-xs font-medium text-ink/38">系统看到的依据</p>
            <p className="mt-1">
              后面计算确实受到影响，但最早开始偏的位置仍然是销量变化关系。
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <SecondaryButton>返回题目</SecondaryButton>
          <PrimaryButton>更新记录</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

export default function FigmaDiagnosisStateDrawer({
  state,
}: FigmaDiagnosisStateDrawerProps) {
  if (state === 'dispute-recorded') {
    return <RecordedModal />;
  }

  if (state === 'dispute-recorded-evidence') {
    return <RecordedModal evidenceOpen />;
  }

  if (state === 'dispute-record-updated') {
    return (
      <div className="fixed right-8 top-8 z-[70] rounded-2xl border border-calculation/25 bg-white px-5 py-4 text-sm font-medium text-ink shadow-[0_18px_48px_rgba(47,52,59,0.14)]">
        已更新这道题的记录。
      </div>
    );
  }

  const isStart = state === 'dispute-start' || state === 'dispute-basis';
  const isFilled = state === 'dispute-filled';
  const isReview = state === 'dispute-review';
  const isSupplement = state === 'dispute-supplement';
  const isSupplementReview = state === 'dispute-supplement-review';
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
            <Tag type="info">
              {isValidation || isResult ? 'Figma 捕捉状态' : '重新看一下'}
            </Tag>
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
          {isStart || isFilled ? (
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

          {isReview ? <ReviewContent withSupplement={false} /> : null}

          {isSupplement ? (
            <>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                可以。你可以指出 AI 漏看的步骤，或者说明为什么你认为主断点不在这里。
              </div>
              <section>
                <p className="mb-2 text-sm font-semibold text-ink">
                  继续补充你的想法
                </p>
                <textarea
                  className="min-h-40 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none"
                  readOnly
                  value={supplementText}
                />
              </section>
            </>
          ) : null}

          {isSupplementReview ? <ReviewContent withSupplement /> : null}

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
            </>
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          <div className="flex flex-wrap justify-end gap-3">
            {isStart || isFilled ? (
              <>
                <SecondaryButton>先返回</SecondaryButton>
                <PrimaryButton>提交校准</PrimaryButton>
              </>
            ) : null}
            {isReview ? (
              <>
                <button
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink/45"
                  type="button"
                >
                  先保留原判断
                </button>
                <SecondaryButton>我还想补充</SecondaryButton>
                <PrimaryButton>我接受这个判断</PrimaryButton>
              </>
            ) : null}
            {isSupplement ? (
              <>
                <SecondaryButton>返回上一步</SecondaryButton>
                <PrimaryButton>再看一遍</PrimaryButton>
              </>
            ) : null}
            {isSupplementReview ? (
              <>
                <button
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink/45"
                  type="button"
                >
                  先保留原判断
                </button>
                <SecondaryButton>我还想补充</SecondaryButton>
                <PrimaryButton>我接受这个记录</PrimaryButton>
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
