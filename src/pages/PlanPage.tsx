import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { coachCopy } from '../data/languageSystem';

type PlanTasks = {
  reviewErrors: number;
  skillPractice: number;
  variationProblems: number;
};

const recommendedTasks: PlanTasks = {
  reviewErrors: 2,
  skillPractice: 3,
  variationProblems: 1,
};

const futureDays = [
  {
    day: 'Day 2',
    title: '巩固建模过程',
    description: '重做旧题 + 2 道建模题 + 总结一个错因',
    estimatedMinutes: '20 分钟',
  },
  {
    day: 'Day 3',
    title: '测试能不能迁移',
    description: '1 道综合题 + 查看诊断 + 更新能力图',
    estimatedMinutes: '30 分钟',
  },
];

const reviewOptions = [0, 1, 2, 3];
const skillOptions = [0, 2, 3, 5];
const variationOptions = [0, 1, 2];

const getEstimatedMinutes = (tasks: PlanTasks) =>
  tasks.reviewErrors * 5 + tasks.skillPractice * 3 + tasks.variationProblems * 6;

const getSuggestion = (tasks: PlanTasks) => {
  const totalTasks =
    tasks.reviewErrors + tasks.skillPractice + tasks.variationProblems;

  if (tasks.skillPractice === 5 && tasks.variationProblems === 2) {
    return '这个版本偏加强，适合今天时间比较充足的时候做。';
  }

  if (totalTasks <= 1) {
    return '今天可以轻一点，但建议至少复盘 1 道旧错题，再练 2 道把条件写成式子的题。';
  }

  if (tasks.skillPractice === 0) {
    return '如果完全不练「条件转化」，今天的计划可能不太有效。建议至少保留 2 道。';
  }

  if (tasks.variationProblems === 0) {
    return '可以先不做变式题，但完成专项后最好再用新情境测一下。';
  }

  return '这个安排可以，今天仍然保留了关键练习。';
};

const getTaskRows = (tasks: PlanTasks) =>
  [
    tasks.reviewErrors > 0
      ? {
          title: `复习 ${tasks.reviewErrors} 道旧错题`,
          desc: '先找回上次卡住的位置。',
        }
      : null,
    tasks.skillPractice > 0
      ? {
          title: `练 ${tasks.skillPractice} 道把条件写成式子的题`,
          desc: '只练“题里的话 → 数学关系”这一小步。',
        }
      : null,
    tasks.variationProblems > 0
      ? {
          title: `做 ${tasks.variationProblems} 道变式题`,
          desc: '看看换个情境还能不能做。',
        }
      : null,
  ].filter(Boolean) as { title: string; desc: string }[];

export default function PlanPage() {
  const [searchParams] = useSearchParams();
  const figmaState = searchParams.get('figmaState');
  const [tasks, setTasks] = useState<PlanTasks>(recommendedTasks);
  const [draftTasks, setDraftTasks] = useState<PlanTasks>(recommendedTasks);
  const [adjustOpen, setAdjustOpen] = useState(
    figmaState === 'plan-adjust-modal',
  );
  const [reasonOpen, setReasonOpen] = useState(false);

  const taskRows = useMemo(() => getTaskRows(tasks), [tasks]);
  const estimatedMinutes = useMemo(() => getEstimatedMinutes(tasks), [tasks]);
  const draftEstimatedMinutes = useMemo(
    () => getEstimatedMinutes(draftTasks),
    [draftTasks],
  );
  const draftSuggestion = useMemo(() => getSuggestion(draftTasks), [draftTasks]);

  const openAdjust = () => {
    setDraftTasks(tasks);
    setAdjustOpen(true);
  };

  const applyDraft = () => {
    setTasks(draftTasks);
    setAdjustOpen(false);
  };

  const resetRecommended = () => {
    setDraftTasks(recommendedTasks);
  };

  const renderSelector = (
    key: keyof PlanTasks,
    label: string,
    options: number[],
    unit: string,
  ) => (
    <div className="rounded-[1.35rem] border border-ink/8 bg-white p-4">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
              draftTasks[key] === option
                ? 'border-calculation/45 bg-accent-action text-ink'
                : 'border-ink/10 bg-chalk text-ink/52 hover:bg-white'
            }`}
            key={option}
            onClick={() =>
              setDraftTasks((current) => ({ ...current, [key]: option }))
            }
            type="button"
          >
            {option} {unit}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[960px] space-y-5">
      <article className="rounded-[2rem] border border-translation/20 bg-white p-7 shadow-card ring-4 ring-translation/10">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_140px]">
          <div>
            <Tag type="warning">今天只做 Day 1</Tag>
            <h1 className="mt-4 text-[32px] font-semibold tracking-tight text-ink">
              修正「条件转化」这一步
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/60">
              题目意思你大多能看懂，但转成式子时容易拐弯。今天先补这一个点。
            </p>
          </div>
          <div className="hidden rounded-[1.75rem] bg-accent-focus p-3 md:block">
            <AbilityMascot ability="translation" size="card" />
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_210px]">
          <div className="space-y-3">
            {taskRows.length > 0 ? (
              taskRows.map((task, index) => (
                <div
                  className="flex items-start gap-3 rounded-[1.35rem] border border-ink/8 bg-white p-4"
                  key={task.title}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-focus text-sm font-semibold text-ink">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-ink">
                      {task.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink/52">
                      {task.desc}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.35rem] border border-ink/8 bg-chalk p-5 text-sm leading-6 text-ink/55">
                今天还没有安排任务。可以点“调整计划”加一点轻量练习。
              </div>
            )}

            <button
              className="rounded-2xl border border-ink/8 bg-chalk px-4 py-3 text-left text-sm text-ink/58 transition hover:bg-white"
              onClick={() => setReasonOpen((value) => !value)}
              type="button"
            >
              <span className="font-semibold text-ink/68">
                为什么这样安排？
              </span>
              {reasonOpen ? (
                <p className="mt-2 leading-6">
                  最近 10 道错题里，有 6 道卡在“把题目条件写成式子”。所以今天先补这一步。
                </p>
              ) : null}
            </button>
          </div>

          <aside className="rounded-[1.5rem] border border-ink/8 bg-chalk p-4">
            <p className="text-xs font-medium text-ink/42">预计时间</p>
            <p className="mt-1 text-2xl font-semibold text-ink">
              {estimatedMinutes} 分钟
            </p>
            <p className="mt-5 text-xs font-medium text-ink/42">进度</p>
            <p className="mt-1 text-base font-semibold text-ink">0/3</p>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div className="h-2 w-[12%] rounded-full bg-calculation" />
            </div>
            <PrimaryButton to="/practice" className="mt-6 w-full">
              开始 Day 1
            </PrimaryButton>
            <SecondaryButton onClick={openAdjust} className="mt-3 w-full">
              调整计划
            </SecondaryButton>
          </aside>
        </div>
      </article>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {futureDays.map((day) => (
          <article
            className="group rounded-[1.5rem] border border-ink/8 bg-white/70 p-5 opacity-75 shadow-[0_6px_18px_rgba(47,52,59,0.025)] transition hover:-translate-y-0.5 hover:border-ink/12 hover:opacity-90"
            key={day.day}
            title="完成 Day 1 后解锁"
          >
            <div className="flex items-center justify-between gap-3">
              <Tag type="neutral">{day.day}</Tag>
              <span className="rounded-full bg-chalk px-3 py-1 text-xs font-medium text-ink/42">
                {day.estimatedMinutes}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink/72">
              {day.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/45">
              {day.description}
            </p>
            <p className="mt-4 text-xs font-medium text-ink/35">
              完成 Day 1 后解锁
            </p>
          </article>
        ))}
      </section>

      {adjustOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/18 px-4 backdrop-blur-sm">
          <section className="w-full max-w-[520px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag type="info">调整计划</Tag>
                <h2 className="mt-3 text-[24px] font-semibold tracking-tight text-ink">
                  调整今天计划
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/52">
                  {coachCopy.plan.keepFocusPractice}
                </p>
              </div>
              <button
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={() => setAdjustOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {renderSelector('reviewErrors', '错题复盘', reviewOptions, '道')}
              {renderSelector('skillPractice', '专项练习', skillOptions, '道')}
              {renderSelector(
                'variationProblems',
                '变式题',
                variationOptions,
                '道',
              )}
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-review/20 bg-reviewSoft/70 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">小建议</p>
                  <p className="mt-2 text-sm leading-6 text-ink/58">
                    {draftSuggestion}
                  </p>
                </div>
                {draftTasks.skillPractice === 0 ? (
                  <button
                    className="rounded-full border border-calculation/35 bg-white px-3.5 py-2 text-xs font-medium text-ink transition hover:bg-accent-action"
                    onClick={() =>
                      setDraftTasks((current) => ({
                        ...current,
                        skillPractice: 2,
                      }))
                    }
                    type="button"
                  >
                    保留 2 道专项
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-5 rounded-[1.35rem] bg-chalk px-4 py-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink/52">预计时间</span>
                <span className="font-semibold text-ink">
                  {draftEstimatedMinutes} 分钟
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink/52">今日重点</span>
                <span className="font-semibold text-ink">条件转化</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={resetRecommended}>
                恢复推荐计划
              </SecondaryButton>
              <PrimaryButton onClick={applyDraft}>
                确认调整
              </PrimaryButton>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
