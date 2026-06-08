import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

export type FigmaAbilityState =
  | 'negotiation-basis'
  | 'negotiation-validation'
  | 'negotiation-result'
  | 'negotiation-continue'
  | 'ability-negotiation-start'
  | 'ability-negotiation-understood'
  | 'ability-negotiation-evidence'
  | 'ability-negotiation-system-basis'
  | 'ability-negotiation-validation'
  | 'ability-negotiation-result'
  | 'ability-negotiation-continue'
  | 'ability-negotiation-continue-result'
  | 'ability-negotiation-confirmed';

type FigmaAbilityStateDrawerProps = {
  state: FigmaAbilityState;
};

const studentIdea =
  '我最近几道同类题都能写出关系式了，我觉得条件转化的分可以更高';

const basisEvidence = [
  '这道题中，关键条件没有转成可用关系式。',
  '最近 3 道同类题里，有 2 道卡在条件提取或条件使用。',
  '订正中补上了计算过程，但没有说明为什么这样列式。',
];

const basicTasks = [
  '找出题目中的关键条件',
  '选择正确的关系式',
  '简单解释为什么这样列式',
];

const advancedTasks = [
  '在新题目里找出两个变化量',
  '把变化量写成完整关系式',
  '说明这个关系式为什么适合题意',
];

function StepHeader({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-chalk px-3 py-2">
      {['说想法', '补依据或验证', '反馈'].map((step, index) => (
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
            className={`min-w-0 text-xs font-medium leading-4 ${
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

function SystemBasis({ expanded = true }: { expanded?: boolean }) {
  return (
    <section className="rounded-[1.35rem] border border-ink/8 bg-chalk/65 px-4 py-3">
      <p className="text-xs font-medium text-ink/38">
        关于：条件转化 · 当前 58 · 系统有多确定：中等
      </p>
      <p className="mt-3 text-sm font-semibold text-ink">系统目前看到</p>
      {expanded ? (
        <div className="mt-3 space-y-2">
          {basisEvidence.map((item, index) => (
            <p
              className="rounded-2xl bg-white px-3 py-3 text-sm leading-6 text-ink/62"
              key={item}
            >
              {index + 1}. {item}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ValidationTasks({ advanced = false }: { advanced?: boolean }) {
  const tasks = advanced ? advancedTasks : basicTasks;

  return (
    <section className="rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">
            {advanced ? '再做一轮进阶验证' : '做 3 道小验证'}
          </h3>
          <p className="mt-1 text-xs leading-5 text-ink/45">
            {advanced
              ? '如果你觉得这个能力还可以更高，可以再做一轮稍难一点的小验证。'
              : '不做完整大题，只看这一块是否稳定。'}
          </p>
        </div>
        <span className="rounded-full bg-accent-action px-3 py-1 text-xs font-semibold text-ink/62">
          3/3 通过
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((task, index) => (
          <article
            className="rounded-2xl border border-ink/8 bg-chalk/65 px-4 py-3"
            key={task}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {advanced ? '进阶验证' : '小验证'} {index + 1}
                </p>
                <p className="mt-1 text-sm leading-6 text-ink/55">{task}</p>
              </div>
              <span className="shrink-0 rounded-full bg-accent-action px-2.5 py-1 text-xs font-medium text-ink/68">
                通过
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
  );
}

function ResultCard({
  newScore,
  oldScore,
  secondRound = false,
}: {
  newScore: number;
  oldScore: number;
  secondRound?: boolean;
}) {
  return (
    <section className="rounded-[1.5rem] border border-calculation/20 bg-accent-action/70 p-4">
      <Tag type="success">小验证结果</Tag>
      <div className="mt-4 rounded-[1.35rem] bg-white/80 px-4 py-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink/48">条件转化</p>
            <p className="mt-2 text-[32px] font-semibold leading-none tracking-tight text-ink">
              {oldScore}
              <span className="mx-2 text-ink/28">→</span>
              {newScore}
            </p>
          </div>
          <span className="rounded-full bg-accent-action px-3 py-1.5 text-sm font-semibold text-ink/70">
            +2
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/65 px-4 py-3">
          <p className="text-xs font-medium text-ink/38">本次小验证</p>
          <p className="mt-1 text-lg font-semibold text-ink">3/3</p>
        </div>
        <div className="rounded-2xl bg-white/65 px-4 py-3">
          <p className="text-xs font-medium text-ink/38">状态</p>
          <p className="mt-1 text-lg font-semibold text-ink">正在变稳</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-ink/62">
        你这次 3
        个小任务都做对了。系统会先给【条件转化】小幅加分，并把这次表现加入记录。
      </p>
      <p className="mt-3 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-6 text-ink/58">
        长期画像不会因为一次小验证大幅变化，但这次表现会加入记录。
      </p>
      {!secondRound ? (
        <p className="mt-3 text-sm leading-7 text-ink/62">
          再做 1–2 道同类题，如果继续稳定，系统会继续更新画像。
        </p>
      ) : null}
    </section>
  );
}

function ConfirmedModal() {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/18 px-4 backdrop-blur-sm">
      <section className="w-full max-w-[470px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Tag type="success">确认完成</Tag>
            <h2 className="mt-4 text-[22px] font-semibold leading-8 tracking-tight text-ink">
              这次调整已记录
            </h2>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm text-ink/40">
            ×
          </span>
        </div>

        <p className="mt-5 text-sm leading-7 text-ink/62">
          系统已把这次协商和小验证表现加入【条件转化】画像记录。
        </p>

        <div className="mt-4 rounded-[1.5rem] bg-accent-action px-4 py-4">
          <p className="text-xs font-medium text-ink/38">记录摘要</p>
          <p className="mt-2 text-[26px] font-semibold tracking-tight text-ink">
            条件转化：58 → 62
          </p>
          <p className="mt-2 text-sm leading-6 text-ink/58">
            状态：临时上调，后续继续观察
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <SecondaryButton>查看记录</SecondaryButton>
          <PrimaryButton>返回能力画像</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

export default function FigmaAbilityStateDrawer({
  state,
}: FigmaAbilityStateDrawerProps) {
  if (state === 'ability-negotiation-confirmed') {
    return <ConfirmedModal />;
  }

  const isStart =
    state === 'ability-negotiation-start' || state === 'negotiation-basis';
  const isUnderstood = state === 'ability-negotiation-understood';
  const isEvidence = state === 'ability-negotiation-evidence';
  const isSystemBasis = state === 'ability-negotiation-system-basis';
  const isValidation =
    state === 'ability-negotiation-validation' ||
    state === 'negotiation-validation';
  const isResult =
    state === 'ability-negotiation-result' || state === 'negotiation-result';
  const isContinue =
    state === 'ability-negotiation-continue' || state === 'negotiation-continue';
  const isContinueResult = state === 'ability-negotiation-continue-result';
  const activeStep = isStart || isSystemBasis ? 0 : isResult || isContinueResult ? 2 : 1;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-ink/18 backdrop-blur-sm">
      <aside className="flex h-full w-full max-w-[600px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)] sm:min-w-[520px]">
        <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
          <div>
            <Tag type="info">重新看看</Tag>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              你觉得哪里不合理？
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/52">
              直接说你的想法就行。比如分数偏低，或者系统漏看了你最近的表现。
            </p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm text-ink/40">
            ×
          </span>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <StepHeader active={activeStep} />

          {isStart || isSystemBasis ? (
            <>
              <section className="rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                <p className="text-sm font-semibold text-ink">你的想法</p>
                <textarea
                  className="mt-3 min-h-36 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none"
                  readOnly
                  value={studentIdea}
                />
                <button
                  className="mt-4 text-sm font-medium text-ink/45 underline decoration-ink/20 underline-offset-4"
                  type="button"
                >
                  {isSystemBasis ? '收起系统依据' : '查看系统依据'}
                </button>
              </section>
              {isSystemBasis ? <SystemBasis /> : null}
            </>
          ) : null}

          {isUnderstood ? (
            <>
              <div className="rounded-[1.5rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                <p className="font-medium text-ink">我理解你的意思是：</p>
                <p className="mt-1">
                  “你觉得【条件转化】这个判断需要重新看，因为：{studentIdea}”
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-ink/8 bg-white px-4 py-3 text-sm leading-7 text-ink/62">
                这个可以重新看。接下来你可以补充一点依据，或者做一个小验证。
              </div>
              <button
                className="w-fit text-sm font-medium text-ink/45 underline decoration-ink/20 underline-offset-4"
                type="button"
              >
                查看系统依据
              </button>
            </>
          ) : null}

          {isEvidence ? (
            <section className="rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
              <p className="text-base font-semibold text-ink">补充一点依据</p>
              <p className="mt-1 text-sm leading-6 text-ink/48">
                可以写系统漏看的地方，比如哪道题、哪一步、最近哪次练习表现。
              </p>
              <textarea
                className="mt-4 min-h-36 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none"
                readOnly
                value="第 8 题里我已经写出了销量关系，真正出错是在后面展开计算。"
              />
            </section>
          ) : null}

          {isValidation ? <ValidationTasks /> : null}
          {isContinue ? <ValidationTasks advanced /> : null}
          {isResult ? <ResultCard oldScore={58} newScore={60} /> : null}
          {isContinueResult ? (
            <ResultCard oldScore={60} newScore={62} secondRound />
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          <div className="flex flex-wrap justify-end gap-3">
            {isStart || isSystemBasis ? (
              <>
                <SecondaryButton>先返回</SecondaryButton>
                <PrimaryButton>提交想法</PrimaryButton>
              </>
            ) : null}
            {isUnderstood ? (
              <>
                <SecondaryButton>先返回</SecondaryButton>
                <SecondaryButton>补充依据</SecondaryButton>
                <PrimaryButton>做小验证</PrimaryButton>
              </>
            ) : null}
            {isEvidence ? (
              <>
                <SecondaryButton>返回上一步</SecondaryButton>
                <PrimaryButton>提交依据</PrimaryButton>
              </>
            ) : null}
            {isValidation || isContinue ? (
              <>
                <SecondaryButton>返回上一步</SecondaryButton>
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
            {isContinueResult ? (
              <>
                <SecondaryButton>去练这一块</SecondaryButton>
                <SecondaryButton>返回我的进步</SecondaryButton>
                <PrimaryButton>完成确认</PrimaryButton>
              </>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
