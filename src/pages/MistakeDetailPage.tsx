import type { ReactNode } from 'react';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const standardSteps = [
  '设变量',
  '建立函数关系',
  '代入条件求表达式',
  '建立利润函数',
  '求解并检验',
];

const timeline = [
  {
    date: '05.01',
    title: '第一次做错',
    detail: '条件转化失败',
    type: 'danger' as const,
  },
  {
    date: '05.03',
    title: '第二次重做',
    detail: '模型建立正确，但计算出错',
    type: 'warning' as const,
  },
  {
    date: '05.06',
    title: '第三次练习',
    detail: '完整做对',
    type: 'success' as const,
  },
];

const hints = [
  {
    level: 'H1',
    title: '给我一点提示',
    content:
      '题目中“售价每增加 1 元，销量减少 2 件”说明两个变量之间存在关系。',
  },
  {
    level: 'H2',
    title: '告诉我该用什么方法',
    content: '你需要先设售价为 x，销量为 y，再建立 y 关于 x 的表达式。',
  },
  {
    level: 'H3',
    title: '提示下一步',
    content: '先找出题目中给出的两个对应点，然后代入一次函数 y = kx + b。',
  },
  {
    level: 'H4',
    title: '展开完整解析',
    content:
      '完整步骤：设售价为 x，销量为 y；根据题目条件找出两个对应点；代入 y = kx + b 求出销量函数；再用利润 = 单件利润 × 销量 建立目标函数；最后求最值并检验答案是否符合题意。',
  },
];

function ArchiveCard({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        {tag}
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export default function MistakeDetailPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Tag type="warning">L2 初步掌握</Tag>
              <Tag type="danger">主要错因：条件转化失败</Tag>
              <Tag type="neutral">加入时间：2026.05.03</Tag>
            </div>
            <h1 className="mt-4 font-display text-[32px] font-semibold tracking-tight text-ink">
              一次函数应用题 - 商品销售问题
            </h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-ink/60">
              这是一份完整错题档案，记录原始作答、诊断结论、复练轨迹和分层提示。
            </p>
          </div>
          <AbilityMascot ability="translation" size="card" />

          <div className="flex shrink-0 flex-wrap justify-end gap-3">
            <PrimaryButton to="/practice">开始重做</PrimaryButton>
            <PrimaryButton to="/practice" variant="sun">
              做变式题
            </PrimaryButton>
            <SecondaryButton>标记为已掌握</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] gap-6">
        <div className="space-y-6">
          <ArchiveCard title="原题卡片" tag={<Tag type="info">原题</Tag>}>
            <p className="rounded-[1.5rem] bg-chalk p-5 text-lg font-semibold leading-8 text-ink/72">
              某商店销售一种商品，已知售价与销量之间满足一次函数关系。若售价每增加 1 元，销量减少 2 件，请根据条件建立函数表达式，并求最大利润。
            </p>
          </ArchiveCard>

          <ArchiveCard title="学生原答案卡片" tag={<Tag type="warning">原始作答</Tag>}>
            <p className="rounded-[1.5rem] bg-readingSoft p-5 font-semibold leading-8 text-ink/68">
              我直接代入售价进行计算，得到最终答案，没有先写出销量和售价之间的函数关系。
            </p>
          </ArchiveCard>

          <ArchiveCard title="标准答案卡片" tag={<Tag type="success">标准步骤</Tag>}>
            <div className="mt-5 space-y-3">
              {standardSteps.map((step, index) => (
                <div
                  className="flex items-center gap-3 rounded-[1.35rem] border border-ink/5 bg-white p-4"
                  key={step}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-meadow text-sm font-medium text-leaf">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-ink/68">{step}</p>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard
            title="重新作答区"
            tag={
              <div className="flex items-center gap-2">
                <AbilityMascot ability="calculation" size="card" />
                <Tag type="neutral">再次尝试</Tag>
              </div>
            }
          >
            <textarea
              className="min-h-56 w-full resize-none rounded-[1.5rem] border border-ink/10 bg-chalk px-5 py-4 text-sm font-semibold leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15"
              placeholder="在这里重新作答 / 上传你的解题过程"
            />
            <div className="mt-4 flex gap-3">
              <PrimaryButton>提交重做答案</PrimaryButton>
              <SecondaryButton>上传手写答案</SecondaryButton>
            </div>
          </ArchiveCard>
        </div>

        <aside className="space-y-6">
          <ArchiveCard title="历史诊断卡片" tag={<Tag type="danger">第一次诊断</Tag>}>
            <div className="mb-4 flex items-center gap-3">
              <AbilityMascot ability="translation" size="avatar" />
              <p className="rounded-2xl border border-ink/10 bg-translationSoft px-4 py-3 text-sm font-medium leading-6 text-ink/62">
                这步有点绕，我们拆开看。
              </p>
            </div>
            <div className="space-y-3">
              {[
                ['断链位置', '条件转化'],
                ['错因', '未建立一次函数模型'],
                ['建议', '练习文字条件转表达式'],
              ].map(([label, value]) => (
                <div
                  className="rounded-[1.35rem] border border-ink/5 bg-white p-4"
                  key={label}
                >
                  <p className="text-xs font-medium text-ink/42">{label}</p>
                  <p className="mt-1 font-medium leading-7 text-ink">{value}</p>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard title="练习记录时间线" tag={<Tag type="info">进步过程</Tag>}>
            <div className="relative space-y-5 pl-5">
              <div className="absolute bottom-4 left-[9px] top-4 w-px bg-ink/10" />
              {timeline.map((item) => (
                <div className="relative" key={item.date}>
                  <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-white ring-4 ring-sky/25" />
                  <div className="rounded-[1.35rem] border border-ink/5 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-xl font-semibold text-ink">
                        {item.date}
                      </p>
                      <Tag type={item.type}>{item.title}</Tag>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink/62">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ArchiveCard>

          <ArchiveCard title="能力变化卡片" tag={<Tag type="success">能力影响</Tag>}>
            <p className="text-sm font-normal text-ink/55">这道题影响的能力：</p>
            <div className="mt-4 space-y-3">
              {[
                ['条件转化', '58', '62'],
                ['建立模型', '61', '65'],
              ].map(([name, before, after]) => (
                <div className="rounded-[1.35rem] bg-calculationSoft p-4" key={name}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="font-display text-2xl font-semibold text-leaf">
                      {before} → {after}
                    </p>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white">
                    <div className="h-2.5 w-2/3 rounded-full bg-grass" />
                  </div>
                </div>
              ))}
            </div>
          </ArchiveCard>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Tag type="warning">分层提示系统</Tag>
            <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
              先给线索，再给方法，最后才给完整解析
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-ink/55">
            每一层提示只解决下一小步，避免一上来直接看答案。
          </p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {hints.map((hint, index) => (
            <details
              className="group rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-[0_8px_24px_rgba(52,63,76,0.05)] open:bg-translationSoft"
              key={hint.level}
              open={index === 0}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <AbilityMascot
                    ability={
                      index === 0
                        ? 'reading'
                        : index === 1
                          ? 'translation'
                          : index === 2
                            ? 'model'
                            : 'review'
                    }
                    size="inline"
                  />
                  <span className="rounded-full bg-chalk px-3 py-1.5 text-xs font-medium text-ink/55 group-open:bg-sun/45 group-open:text-honey">
                    {hint.level}
                  </span>
                  <span className="text-xs font-medium text-ink/35 group-open:text-honey">
                    展开
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {hint.title}
                </h3>
              </summary>
              <p className="mt-4 text-sm font-semibold leading-7 text-ink/64">
                {hint.content}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
