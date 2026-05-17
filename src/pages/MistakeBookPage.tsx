import AbilityMascot, { type Ability } from '../components/AbilityMascot';
import MistakeCard, { type MistakeStatus } from '../components/MistakeCard';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const quickFilters = ['待复习', '最近上传', '高频错因', '考前必看', '已掌握'];

const filterGroups = [
  {
    title: '按知识点',
    items: ['一次函数', '二次函数', '几何证明', '概率统计'],
  },
  {
    title: '按错因',
    items: ['读题理解', '条件转化', '建立模型', '方法选择', '计算执行', '复核检查'],
  },
  {
    title: '按来源',
    items: ['作业', '周测', '月考', '模拟考', '教辅'],
  },
  {
    title: '按掌握度',
    items: ['L1 未接触', 'L2 初步掌握', 'L3 稳定掌握', 'L4 灵活迁移', 'L5 深度拓展'],
  },
];

const reasonBuddy: Record<string, Ability> = {
  读题理解: 'reading',
  条件转化: 'translation',
  建立模型: 'model',
  方法选择: 'method',
  计算执行: 'calculation',
  复核检查: 'review',
};

const mistakeCards: Array<{
  id: number;
  title: string;
  knowledgePoint: string;
  mainReason: string;
  brokenStep: string;
  mastery: string;
  lastPracticedAt: string;
  practiceCount: number;
  status: MistakeStatus;
}> = [
  {
    id: 1,
    title: '一次函数应用题 - 商品销售问题',
    knowledgePoint: '一次函数 / 应用题',
    mainReason: '条件转化失败',
    brokenStep: '建立模型前',
    mastery: 'L2 初步掌握',
    lastPracticedAt: '2026.05.03',
    practiceCount: 2,
    status: '待复习',
  },
  {
    id: 2,
    title: '几何证明题 - 平行线性质',
    knowledgePoint: '几何证明 / 平行线',
    mainReason: '逻辑跳步',
    brokenStep: '方法选择',
    mastery: 'L3 稳定掌握',
    lastPracticedAt: '2026.04.30',
    practiceCount: 4,
    status: '需要巩固',
  },
  {
    id: 3,
    title: '二次函数图像题 - 顶点式',
    knowledgePoint: '二次函数 / 图像性质',
    mainReason: '模型识别错误',
    brokenStep: '建立模型',
    mastery: 'L2 初步掌握',
    lastPracticedAt: '2026.04.28',
    practiceCount: 3,
    status: '需重做',
  },
  {
    id: 4,
    title: '概率统计题 - 样本估计总体',
    knowledgePoint: '概率统计 / 数据分析',
    mainReason: '题型识别不稳定',
    brokenStep: '读题理解',
    mastery: 'L3 稳定掌握',
    lastPracticedAt: '2026.04.26',
    practiceCount: 5,
    status: '需要巩固',
  },
  {
    id: 5,
    title: '一次函数图像题 - 交点含义',
    knowledgePoint: '一次函数 / 图像理解',
    mainReason: '复核检查缺失',
    brokenStep: '复核检查',
    mastery: 'L4 灵活迁移',
    lastPracticedAt: '2026.04.24',
    practiceCount: 6,
    status: '已掌握',
  },
  {
    id: 6,
    title: '立体几何题 - 空间距离',
    knowledgePoint: '立体几何 / 空间想象',
    mainReason: '方法选择偏慢',
    brokenStep: '方法选择',
    mastery: 'L2 初步掌握',
    lastPracticedAt: '2026.04.22',
    practiceCount: 1,
    status: '待复习',
  },
];

export default function MistakeBookPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <AbilityMascot ability="reading" size="card" />
              <div>
                <Tag type="info">Mistake Database</Tag>
                <h1 className="mt-4 font-display text-[32px] font-semibold text-ink">
                  错题本
                </h1>
              </div>
            </div>
            <p className="mt-3 text-[15px] font-normal leading-7 text-ink/60">
              这里不是错题垃圾桶，而是你的错误数据库。
            </p>
          </div>

          <label className="relative mt-2 block w-[360px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ink/35">
              搜
            </span>
            <input
              className="h-12 w-full rounded-full border border-ink/10 bg-chalk pl-11 pr-4 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15"
              placeholder="搜索题目、知识点、错因"
              type="search"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {quickFilters.map((filter, index) => (
            <button
              className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
                index === 0
                  ? 'border-honey/20 bg-cream text-honey shadow-card'
                  : 'border-ink/10 bg-white text-ink/60 hover:bg-mist hover:text-ink'
              }`}
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[340px_minmax(0,1fr)] gap-6">
        <aside className="sticky top-0 max-h-[calc(100vh-170px)] self-start overflow-y-auto rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">分类筛选</h2>
            <button
              className="text-sm font-medium text-lagoon hover:text-ink"
              type="button"
            >
              清空
            </button>
          </div>

          <div className="mt-6 space-y-7">
            {filterGroups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-medium tracking-[0.08em] text-ink/45">
                  {group.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {group.items.map((item, index) => (
                    <button
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition hover:bg-mist ${
                        index === 0
                          ? 'border-sky/30 bg-mist text-lagoon'
                          : 'border-ink/10 bg-white text-ink/58'
                      }`}
                      key={item}
                      type="button"
                    >
                      {reasonBuddy[item] ? (
                        <AbilityMascot ability={reasonBuddy[item]} size="tiny" />
                      ) : null}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
            <div>
              <div className="flex items-center gap-3">
                <AbilityMascot ability="model" size="inline" />
                <h2 className="font-display text-[22px] font-semibold text-ink">
                  共 6 道错题
                </h2>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink/55">
                当前优先展示待复习和近期高频错因。
              </p>
            </div>
            <SecondaryButton to="/upload">上传新错题</SecondaryButton>
          </div>

          {mistakeCards.map((mistake) => (
            <MistakeCard
              brokenStep={mistake.brokenStep}
              detailTo={`/mistakes/${mistake.id}`}
              key={mistake.id}
              knowledgePoint={mistake.knowledgePoint}
              lastPracticedAt={mistake.lastPracticedAt}
              mainReason={mistake.mainReason}
              mastery={mistake.mastery}
              practiceCount={mistake.practiceCount}
              retryTo="/practice"
              status={mistake.status}
              title={mistake.title}
              variantTo="/practice"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
