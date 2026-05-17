import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const dayPlans = [
  {
    day: 'Day 1',
    buddy: 'translation' as const,
    goal: '修正条件转化错误',
    tasks: [
      ['复习 2 道旧错题', '先找回上次卡住的位置'],
      ['完成 3 道文字条件转函数表达式训练', '把文字关系转成表达式'],
      ['做 1 道变式题', '确认能迁移到新情境'],
    ],
    minutes: 25,
    button: '开始 Day 1',
  },
  {
    day: 'Day 2',
    buddy: 'model' as const,
    goal: '巩固建模过程',
    tasks: [
      ['重做昨天错题', '检查模型是否先搭好'],
      ['完成 2 道一次函数建模题', '巩固函数结构'],
      ['总结一个错因', '写下下次要避开的坑'],
    ],
    minutes: 20,
    button: '开始 Day 2',
  },
  {
    day: 'Day 3',
    buddy: 'review' as const,
    goal: '测试是否能迁移',
    tasks: [
      ['做 1 道综合应用题', '测试是否能独立迁移'],
      ['查看 AI 诊断', '确认断链是否修复'],
      ['更新能力图', '把今天的变化记录下来'],
    ],
    minutes: 30,
    button: '开始 Day 3',
  },
];

const planReasons = [
  '最近 10 道错题中，6 道错在条件转化。',
  '一次函数应用题掌握度为 L2。',
  '你在计算执行上较稳定，所以今天不安排大量计算训练。',
  '当前距离下次数学测验还有 7 天。',
];

const improvements = [
  ['条件转化', '58', '63', '#E2CDF7'],
  ['建立模型', '61', '65', '#FFD997'],
  ['错题复习完成率', '0%', '80%', '#ABC5EF'],
];

const adjustActions = [
  '今天作业太多，减少任务',
  '我想多练一点',
  '换一个知识点',
  '加入考试复习模式',
];

export default function PlanPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Tag type="info">3-Day Micro Plan</Tag>
            <h1 className="mt-4 font-display text-[32px] font-semibold text-ink">
              三日学习计划
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] font-normal leading-7 text-ink/60">
              根据你的近期错题、掌握度和能力变化生成。
            </p>
          </div>
          <div className="flex max-w-[260px] items-center gap-3">
            <AbilityMascot ability="translation" size="hero" />
            <p className="rounded-2xl border border-ink/10 bg-accent-focus px-4 py-3 text-sm font-medium leading-6 text-ink/62">
              当前重点是条件转化，今天不用把所有短板都打开。
            </p>
          </div>
          <div className="grid min-w-[360px] gap-3 rounded-[1.75rem] bg-chalk p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-ink/42">学习重点</span>
              <span className="text-sm font-medium text-ink">
                一次函数应用题 / 条件转化 / 建立模型
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-ink/42">计划周期</span>
              <Tag type="warning">2026.05.03 - 2026.05.05</Tag>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_380px] gap-6">
        <main className="space-y-5">
          {dayPlans.map((plan, index) => (
            <article
              className={`rounded-[2rem] border bg-white p-5 shadow-card ${
                index === 0 ? 'border-translation/25 ring-4 ring-translation/10' : 'border-ink/10'
              }`}
              key={plan.day}
            >
              <div className="grid grid-cols-[220px_minmax(0,1fr)_180px] gap-5">
                <div className={index === 0 ? 'rounded-[1.5rem] bg-accent-focus p-4' : 'rounded-[1.5rem] bg-white p-4 shadow-[inset_4px_0_0_rgba(47,52,59,0.08)]'}>
                  <div className="flex items-center gap-3">
                    <AbilityMascot ability={plan.buddy} size="card" />
                    <Tag type={index === 0 ? 'warning' : 'neutral'}>
                      {index === 0 ? '当前任务' : plan.day}
                    </Tag>
                  </div>
                  <h2 className="mt-4 font-display text-[28px] font-semibold text-ink">
                    {plan.day}
                  </h2>
                  <p className="mt-2 text-base font-medium leading-7 text-ink/70">
                    目标：{plan.goal}
                  </p>
                </div>

                <div className="space-y-3">
                  {plan.tasks.map(([task, description], taskIndex) => (
                    <div
                      className="flex items-start gap-3 rounded-[1.25rem] border border-ink/5 bg-white p-3"
                      key={task}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-medium text-ink/60 shadow-[inset_0_0_0_1px_rgba(47,52,59,0.08)]">
                        {taskIndex + 1}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-ink">{task}</p>
                        <p className="mt-1 text-sm font-normal leading-6 text-ink/52">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-between rounded-[1.5rem] border border-ink/8 bg-white p-4">
                  <div>
                    <p className="text-xs font-medium text-ink/42">预计时间</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-ink">
                      {plan.minutes} 分钟
                    </p>
                    <p className="mt-4 text-xs font-medium text-ink/42">当前状态</p>
                    <p className="mt-1 text-base font-semibold text-ink">0/3</p>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: index === 0 ? '20%' : '0%',
                          backgroundColor:
                            index === 0 ? '#E2CDF7' : index === 1 ? '#FFD997' : '#ABC5EF',
                        }}
                      />
                    </div>
                  </div>
                  <PrimaryButton
                    className="mt-5 w-full"
                    to={index === 2 ? '/abilities' : '/practice'}
                    variant={index === 0 ? 'primary' : 'ghost'}
                  >
                    {plan.button}
                  </PrimaryButton>
                </div>
              </div>
            </article>
          ))}
        </main>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Tag type="info">计划依据</Tag>
                <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
                  为什么这样安排？
                </h2>
              </div>
              <AbilityMascot ability="review" size="inline" />
            </div>
            <div className="mt-6 space-y-3">
              {planReasons.map((reason, index) => (
                <div
                  className="flex items-start gap-3 rounded-[1.35rem] bg-chalk p-4"
                  key={reason}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm font-medium text-lagoon">
                    {index + 1}
                  </span>
                  <p className="font-semibold leading-7 text-ink/68">{reason}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <Tag type="success">预计改善</Tag>
            <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
              本计划预计改善
            </h2>
            <div className="mt-6 space-y-4">
              {improvements.map(([name, before, after, color]) => (
                <div className="rounded-[1.35rem] border border-ink/10 bg-white p-4" key={name}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="font-display text-2xl font-semibold text-leaf">
                      {before} → {after}
                    </p>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white">
                    <div
                      className="h-2.5 w-4/5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Tag type="neutral">调整计划</Tag>
            <h2 className="mt-3 font-display text-[22px] font-semibold text-ink">
              今天状态不同？可以轻量调整
            </h2>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            {adjustActions.map((action, index) =>
              index === 1 ? (
                <PrimaryButton key={action} variant="sun">
                  {action}
                </PrimaryButton>
              ) : (
                <SecondaryButton key={action}>{action}</SecondaryButton>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
