import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

export type FigmaAbilityState =
  | 'negotiation-basis'
  | 'negotiation-validation'
  | 'negotiation-result'
  | 'negotiation-continue';

type FigmaAbilityStateDrawerProps = {
  state: FigmaAbilityState;
};

const basisEvidence = [
  '这道题中，关键条件没有转成可用关系式。',
  '最近 3 道同类题里，有 2 道卡在条件提取或条件使用。',
  '订正中补上了计算过程，但没有说明为什么这样列式。',
];

const directions = [
  '我其实会，只是这题失误',
  'AI 看错了我的步骤',
  '我最近已经练会了',
  '这个错因更像计算问题',
  '我想直接做小验证',
];

const basicTasks = [
  '找出题目中的关键条件',
  '选择正确的关系式',
  '简单解释为什么这样列式',
];

const advancedTasks = [
  '在新题面里找出两个变化量',
  '把变化量写成完整关系式',
  '说明这个关系式为什么适合题意',
];

function StepHeader({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-chalk px-3 py-2">
      {['判断依据', '补充证据', '临时更新'].map((step, index) => (
        <div className="flex min-w-0 flex-1 items-center gap-2" key={step}>
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
              index <= active
                ? 'bg-accent-action text-ink'
                : 'bg-white text-ink/35'
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`truncate text-xs font-medium ${
              index <= active ? 'text-ink/70' : 'text-ink/35'
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

function ValidationTasks({
  advanced = false,
}: {
  advanced?: boolean;
}) {
  const tasks = advanced ? advancedTasks : basicTasks;
  return (
    <section className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">
            {advanced ? '再做一轮进阶验证' : '做 3 道小验证'}
          </h3>
          <p className="mt-1 text-xs leading-5 text-ink/45">
            {advanced
              ? '如果你觉得这个能力还可以更高，可以再做一轮稍难一点的小验证。'
              : '不做完整大题，只看“条件转化”这一步是否稳定。'}
          </p>
        </div>
        <span className="rounded-full bg-accent-action px-3 py-1 text-xs font-semibold text-ink/62">
          {advanced ? '第二轮' : '0/3 通过'}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((task, index) => (
          <article
            className="rounded-2xl border border-ink/8 bg-chalk/65 px-4 py-3"
            key={task}
          >
            <p className="text-sm font-semibold text-ink">
              {advanced ? '进阶验证' : '小验证'} {index + 1}
            </p>
            <p className="mt-1 text-sm leading-6 text-ink/55">{task}</p>
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
  );
}

export default function FigmaAbilityStateDrawer({
  state,
}: FigmaAbilityStateDrawerProps) {
  const isBasis = state === 'negotiation-basis';
  const isValidation = state === 'negotiation-validation';
  const isResult = state === 'negotiation-result';
  const isContinue = state === 'negotiation-continue';
  const activeStep = isBasis ? 0 : isResult ? 2 : 1;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-ink/18 backdrop-blur-sm">
      <aside className="flex h-full w-full max-w-[600px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)] sm:min-w-[520px]">
        <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
          <div>
            <Tag type="info">Figma 捕捉状态</Tag>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              我们重新确认这个判断
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/52">
              你的补充会进入重新确认流程，当前内容为设计捕捉用 mock
              状态。
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/8 bg-chalk text-sm text-ink/40">
            ×
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <StepHeader active={activeStep} />

          {isBasis ? (
            <>
              <section className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                <p className="text-xs font-medium text-ink/38">
                  关于：条件转化 · 当前 62 · 置信度中等
                </p>
                <p className="mt-3 text-base font-semibold text-ink">
                  AI 当前依据
                </p>
                <div className="mt-3 space-y-2">
                  {basisEvidence.map((item, index) => (
                    <p
                      className="rounded-2xl bg-chalk/75 px-3 py-3 text-sm leading-6 text-ink/62"
                      key={item}
                    >
                      {index + 1}. {item}
                    </p>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <p className="mb-2 text-xs font-medium text-ink/42">
                  你想从哪个方向补充？
                </p>
                <div className="flex flex-wrap gap-2">
                  {directions.map((option, index) => (
                    <button
                      className={`rounded-full border px-3.5 py-2 text-xs font-medium ${
                        index === 1
                          ? 'border-calculation/35 bg-accent-action text-ink'
                          : 'border-ink/10 bg-white text-ink/58'
                      }`}
                      key={option}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <textarea
                  className="mt-4 min-h-28 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none placeholder:text-ink/35"
                  placeholder="也可以直接说说你的想法，例如：我最近几道同类题已经能先写出关系式了。"
                />
              </section>
            </>
          ) : null}

          {isValidation ? <ValidationTasks /> : null}
          {isContinue ? <ValidationTasks advanced /> : null}

          {isResult ? (
            <section className="mt-5 rounded-[1.5rem] border border-calculation/20 bg-accent-action/70 p-4">
              <Tag type="success">临时更新</Tag>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                验证结果：3 / 3 通过
              </h3>
              <p className="mt-4 rounded-2xl bg-white/80 px-4 py-4 text-lg font-semibold leading-7 text-ink/75">
                系统更新：条件转化 62 → 68（临时上调）
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/62">
                你在条件提取、关系式转化和解释题中表现稳定，说明原判断需要修正。后续如果继续稳定通过，系统会把这次临时调整转为更稳定的画像。
              </p>
              <p className="mt-3 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-6 text-ink/58">
                如果你觉得这个能力还可以更高，可以继续做一轮稍难一点的小验证。
              </p>
            </section>
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          <div className="flex flex-wrap justify-end gap-3">
            {isBasis ? (
              <>
                <SecondaryButton>先返回</SecondaryButton>
                <SecondaryButton>提交说明</SecondaryButton>
                <PrimaryButton>做小验证</PrimaryButton>
              </>
            ) : null}
            {isValidation || isContinue ? (
              <>
                <SecondaryButton>返回</SecondaryButton>
                <PrimaryButton>完成验证</PrimaryButton>
              </>
            ) : null}
            {isResult ? (
              <>
                <SecondaryButton>去练这一块</SecondaryButton>
                <SecondaryButton>返回我的进步</SecondaryButton>
                <PrimaryButton>继续验证</PrimaryButton>
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
