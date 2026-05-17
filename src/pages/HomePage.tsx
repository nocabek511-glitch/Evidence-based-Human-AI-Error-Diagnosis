import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const reviewMistakes = [
  {
    title: '一次函数应用题',
    reason: '条件转化',
    time: '昨天',
    status: '待复习',
    type: 'warning' as const,
  },
  {
    title: '几何证明题',
    reason: '逻辑跳步',
    time: '3 天前',
    status: '需巩固',
    type: 'info' as const,
  },
  {
    title: '二次函数图像题',
    reason: '建模错误',
    time: '5 天前',
    status: '需重做',
    type: 'danger' as const,
  },
];

const abilityScores = [
  { name: '读题理解', score: 82, ability: 'reading' as const, color: '#F5B1B2' },
  { name: '条件转化', score: 58, ability: 'translation' as const, color: '#E2CDF7' },
  { name: '建立模型', score: 61, ability: 'model' as const, color: '#FFD997' },
  { name: '方法选择', score: 70, ability: 'method' as const, color: '#C8E3A5' },
  { name: '计算执行', score: 76, ability: 'calculation' as const, color: '#9BD1C5' },
  { name: '复核检查', score: 49, ability: 'review' as const, color: '#ABC5EF' },
];

export default function HomePage() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
      <section className="min-w-0 space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-accent-focus" />
          <div className="absolute bottom-[-38px] right-36 h-28 w-28 rounded-full bg-chalk" />
          <div className="relative flex items-center justify-between gap-8">
            <div>
              <Tag type="info">Daily Dashboard</Tag>
              <h1 className="mt-4 font-display text-[32px] font-semibold tracking-tight text-ink">
                今日学习面板
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-semibold leading-8 text-ink/60">
                根据你的近期错题和能力变化，生成今天的学习建议。
              </p>
            </div>
            <div className="rounded-[2rem] bg-accent-focus p-3">
              <AbilityMascot ability="translation" size="empty" />
            </div>
          </div>
        </div>

        <article className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="flex items-start justify-between gap-5">
            <div>
              <Tag type="warning">今日学习建议</Tag>
              <h2 className="mt-4 font-display text-[26px] font-semibold text-ink">
                先稳住条件转化，再进入建模
              </h2>
              <p className="mt-3 max-w-3xl rounded-2xl bg-accent-focus px-4 py-3 text-[15px] font-normal leading-7 text-ink/64">
                你最近在“一次函数应用题”中，主要卡在“条件转化”和“建立模型”。
              </p>
            </div>
            <AbilityMascot ability="translation" size="card" />
            <div className="rounded-[1.5rem] bg-accent-warning px-4 py-3 text-center">
              <p className="text-xs font-medium text-honey/75">预计用时</p>
              <p className="font-display text-2xl font-semibold text-honey">35 min</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              ['1', '复习 2 道旧错题', '先找回上次卡住的位置', 'bg-white text-ink'],
              ['2', '完成 3 道条件转化训练', '把文字条件变成函数表达式', 'bg-accent-focus text-ink'],
              ['3', '做 1 道变式挑战题', '看能不能迁移到新情境', 'bg-accent-warning text-ink'],
            ].map(([step, title, desc, tone]) => (
              <div className="rounded-[1.5rem] border border-ink/5 bg-white p-4" key={title}>
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm font-medium ${tone}`}
                >
                  {step}
                </span>
                <p className="mt-4 text-base font-semibold text-ink">{title}</p>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/56">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex gap-3">
            <PrimaryButton to="/practice">开始今日练习</PrimaryButton>
            <SecondaryButton to="/plan">查看计划依据</SecondaryButton>
          </div>
        </article>

        <article className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between">
            <Tag type="info">最近一次诊断</Tag>
            <Tag type="warning">L2 初步掌握</Tag>
          </div>

          <div className="mt-5 grid grid-cols-[1fr_260px] gap-5">
            <div>
              <div className="flex items-center gap-3">
                <AbilityMascot ability="translation" size="inline" />
                <h2 className="font-display text-[24px] font-semibold text-ink">
                  一次函数实际应用题
                </h2>
              </div>
              <p className="mt-4 rounded-[1.5rem] bg-accent-focus p-4 text-[15px] font-normal leading-7 text-ink/64">
                建议：先练“文字条件 → 函数表达式”。这题不是不会函数，而是文字条件拐进表达式时少了一步。
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-[1.25rem] border border-ink/5 bg-white p-4">
                <p className="text-xs font-medium text-ink/42">主要错因</p>
                <p className="mt-1 text-base font-semibold text-ink">条件转化错误</p>
              </div>
              <div className="rounded-[1.25rem] bg-accent-warning p-4">
                <p className="text-xs font-medium text-honey/75">断链步骤</p>
                <p className="mt-1 text-base font-semibold text-ink">第 2 步 - 条件转化</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <SecondaryButton to="/diagnosis">查看完整诊断</SecondaryButton>
            <PrimaryButton to="/practice" variant="sun">
              再做一道类似题
            </PrimaryButton>
          </div>
        </article>

        <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <Tag type="neutral">待复习错题</Tag>
              <h2 className="mt-4 font-display text-[24px] font-semibold text-ink">
                今天建议先回看这 3 张卡
              </h2>
            </div>
            <SecondaryButton to="/mistakes">进入错题本</SecondaryButton>
          </div>

          <div className="mt-6 space-y-3">
            {reviewMistakes.map((item) => (
              <div
                className="grid grid-cols-[1.1fr_0.9fr_120px_110px] items-center gap-4 rounded-[1.35rem] border border-ink/5 bg-white p-4"
                key={item.title}
              >
                <p className="text-base font-semibold text-ink">{item.title}</p>
                <p className="font-semibold text-ink/56">{item.reason}</p>
                <p className="text-sm font-medium text-ink/42">{item.time}</p>
                <Tag type={item.type}>{item.status}</Tag>
              </div>
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-6 self-start">
        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <Tag type="info">六维能力</Tag>
            <span className="rounded-full bg-meadow px-3 py-1 text-xs font-medium text-leaf">
              本周
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {abilityScores.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-ink">
                    <AbilityMascot ability={item.ability} size="tiny" />
                    {item.name}
                  </span>
                  <span className="font-display text-xl font-semibold text-ink">
                    {item.score}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-chalk">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-[1.5rem] bg-accent-focus p-4 text-sm font-normal leading-6 text-ink/64">
            当前最需要提升：条件转化、复核检查。
          </p>
        </section>

        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Tag type="warning">考试倒计时</Tag>
              <h2 className="mt-5 font-display text-[28px] font-semibold text-ink">
                7 天后
              </h2>
              <p className="mt-2 font-medium text-ink/65">下次数学考试</p>
            </div>
            <AbilityMascot ability="review" size="inline" />
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-chalk p-4">
            <p className="text-sm font-medium text-ink/42">考试范围</p>
            <p className="mt-1 font-semibold leading-7 text-ink/70">
              一次函数、二元一次方程组
            </p>
          </div>
          <p className="mt-5 text-sm font-semibold leading-6 text-ink/60">
            建议：优先复习 L2 和 L3 错题。
          </p>
        </section>

        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 text-center shadow-card">
          <div className="mx-auto w-fit rounded-[2rem] bg-accent-action p-3">
            +
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold">快捷上传</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-ink/56">
            遇到新卡点，直接丢进诊断任务里。
          </p>
          <PrimaryButton to="/upload" className="mt-6 w-full">
            上传一道错题
          </PrimaryButton>
        </section>
      </aside>
    </div>
  );
}
