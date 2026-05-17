import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const abilityScores = [
  { name: '读题理解', score: 82, color: '#F5B1B2', buddy: 'reading' as const },
  { name: '条件转化', score: 58, color: '#E2CDF7', buddy: 'translation' as const },
  { name: '建立模型', score: 61, color: '#FFD997', buddy: 'model' as const },
  { name: '方法选择', score: 70, color: '#C8E3A5', buddy: 'method' as const },
  { name: '计算执行', score: 76, color: '#9BD1C5', buddy: 'calculation' as const },
  { name: '复核检查', score: 49, color: '#ABC5EF', buddy: 'review' as const },
];

const reasonStats = [
  ['条件转化', 12],
  ['建立模型', 8],
  ['计算执行', 5],
  ['复核检查', 4],
  ['读题理解', 3],
  ['方法选择', 3],
] as const;

const abilityColorByName: Record<string, string> = {
  读题理解: '#F5B1B2',
  条件转化: '#E2CDF7',
  建立模型: '#FFD997',
  方法选择: '#C8E3A5',
  计算执行: '#9BD1C5',
  复核检查: '#ABC5EF',
};

const evidenceQuestions = [
  '一次函数应用题 - 销售问题',
  '行程问题 - 速度时间关系',
  '几何题 - 角度关系转化',
];

const trends = [
  ['条件转化', '54', '58', 'up'],
  ['建立模型', '59', '61', 'up'],
  ['计算执行', '78', '76', 'down'],
  ['复核检查', '52', '49', 'down'],
] as const;

const radarPoints = (radius: number) => {
  const center = 130;
  return abilityScores
    .map((item, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / abilityScores.length;
      const distance = radius * (item.score / 100);
      return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
    })
    .join(' ');
};

const ringPoints = (radius: number) => {
  const center = 130;
  return abilityScores
    .map((_, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / abilityScores.length;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(' ');
};

export default function AbilityMapPage() {
  const maxReasonCount = Math.max(...reasonStats.map(([, count]) => count));

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Tag type="info">Learning Profile</Tag>
            <h1 className="mt-4 font-display text-[32px] font-semibold text-ink">
              学习画像
            </h1>
            <p className="mt-4 max-w-4xl text-[15px] font-normal leading-7 text-ink/62">
              你在计算执行上较稳定，但在条件转化和复核检查上波动较大。
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Tag type="success">优势能力：计算执行</Tag>
            <Tag type="warning">薄弱能力：条件转化</Tag>
            <Tag type="danger">近期风险：复核检查不足</Tag>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_420px] gap-6">
        <article className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <Tag type="neutral">六维能力图</Tag>
              <h2 className="mt-3 font-display text-[22px] font-semibold text-ink">
                分数不是结论，是证据入口
              </h2>
            </div>
            <span className="rounded-full bg-chalk px-4 py-2 text-sm font-medium text-ink/55">
              近 30 天
            </span>
          </div>

          <div className="mt-8 grid items-start gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
            <div className="rounded-[2rem] bg-chalk p-5">
              <div className="grid place-items-center">
                <svg className="h-[360px] w-[360px]" viewBox="0 0 260 260">
                {[105, 78, 52, 26].map((radius) => (
                  <polygon
                    fill={radius === 105 ? 'rgba(243,247,251,0.8)' : 'none'}
                    key={radius}
                    points={ringPoints(radius)}
                    stroke="rgba(47,52,59,0.12)"
                    strokeWidth="1"
                  />
                ))}
                {abilityScores.map((_, index) => {
                  const angle =
                    -Math.PI / 2 + (index * 2 * Math.PI) / abilityScores.length;
                  return (
                    <line
                      key={index}
                      stroke="rgba(47,52,59,0.10)"
                      x1="130"
                      x2={130 + Math.cos(angle) * 105}
                      y1="130"
                      y2={130 + Math.sin(angle) * 105}
                    />
                  );
                })}
                <polygon
                  fill="rgba(139,200,164,0.28)"
                  points={radarPoints(105)}
                  stroke="#5D9278"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                {abilityScores.map((item, index) => {
                  const angle =
                    -Math.PI / 2 + (index * 2 * Math.PI) / abilityScores.length;
                  const distance = 105 * (item.score / 100);
                  return (
                    <circle
                      cx={130 + Math.cos(angle) * distance}
                      cy={130 + Math.sin(angle) * distance}
                      fill={item.color}
                      key={item.name}
                      r="5"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  );
                })}
                </svg>
              </div>
              <div className="mt-4 rounded-[1.5rem] bg-accent-focus p-4">
                <p className="text-sm font-semibold text-ink">当前重点：条件转化</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-ink/58">
                  雷达图显示这项与复核检查更靠近内圈，建议优先做“文字条件 → 表达式”的短练习。
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {abilityScores.map((item) => (
                <div
                  className="rounded-[1.35rem] border border-ink/5 bg-white px-4 py-3"
                  key={item.name}
                >
                  <div className="flex items-center gap-4">
                    <AbilityMascot ability={item.buddy} size="inline" />
                    <span className="w-24 shrink-0 text-base font-semibold text-ink">
                      {item.name}
                    </span>
                    <div className="h-2.5 flex-1 rounded-full bg-chalk">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right font-display text-2xl font-semibold text-ink">
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card">
          <div className="rounded-[1.75rem] bg-accent-focus p-4">
            <div className="flex items-center gap-4">
            <AbilityMascot ability="translation" size="hero" />
            <p className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm font-medium leading-6 text-ink/62">
              不是不会，是这个点还没站稳。
            </p>
            </div>
            <h2 className="mt-4 font-display text-[28px] font-semibold text-ink">
              条件转化能力：58 分
            </h2>
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-semibold text-ink/50">含义</p>
              <p className="mt-2 font-semibold leading-7 text-ink/64">
                你能读懂题目大意，但经常无法把文字条件转化成数学表达式、图形关系或方程模型。
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-accent-focus p-4">
              <p className="text-sm font-semibold text-honey">近期证据</p>
              <p className="mt-2 text-sm font-medium leading-7 text-ink">
                最近 10 道错题中，有 6 道在该环节出现断链。
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink/50">常见表现</p>
              <ol className="mt-3 space-y-2 text-sm font-semibold text-ink/64">
                <li>1. 漏掉变量之间的变化关系</li>
                <li>2. 不知道该设什么未知数</li>
                <li>3. 文字条件无法转成公式</li>
              </ol>
            </div>
            <div className="rounded-[1.5rem] bg-accent-focus/70 p-4">
              <p className="text-sm font-semibold text-lagoon">建议训练</p>
              <p className="mt-2 font-semibold leading-7 text-ink/64">
                先练“文字条件 → 数学表达式”的基础题，再做综合应用题。
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[0.9fr_1fr_0.9fr] gap-6">
        <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <Tag type="neutral">错因统计</Tag>
          <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
            近 30 天错因分布
          </h2>
          <div className="mt-6 space-y-4">
            {reasonStats.map(([name, count]) => (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{name}</span>
                  <span className="font-medium text-ink/55">{count} 次</span>
                </div>
                <div className="h-2.5 rounded-full bg-chalk">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(count / maxReasonCount) * 100}%`,
                      backgroundColor: abilityColorByName[name],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <Tag type="warning">证据题目</Tag>
          <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
            导致条件转化下降的题目
          </h2>
          <div className="mt-6 space-y-3">
            {evidenceQuestions.map((question, index) => (
              <div
                className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-ink/5 bg-white p-4"
                key={question}
              >
                <div className="flex items-center gap-3">
                  <AbilityMascot
                    ability={index === 0 ? 'translation' : index === 1 ? 'reading' : 'model'}
                    size="tiny"
                  />
                  <p className="font-medium text-ink">{question}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <SecondaryButton to="/diagnosis" className="px-4 py-2">
                    查看诊断
                  </SecondaryButton>
                  <PrimaryButton to="/practice" className="px-4 py-2">
                    再练一次
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <Tag type="info">趋势变化</Tag>
          <h2 className="mt-4 font-display text-[22px] font-semibold text-ink">
            能力变化
          </h2>
          <div className="mt-6 space-y-3">
            {trends.map(([name, before, after, trend]) => (
              <div className="rounded-[1.35rem] bg-chalk p-4" key={name}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <AbilityMascot
                      ability={
                        name === '条件转化'
                          ? 'translation'
                          : name === '建立模型'
                            ? 'model'
                            : name === '计算执行'
                              ? 'calculation'
                              : 'review'
                      }
                      size="inline"
                    />
                    {name}
                  </span>
                  <span
                    className={`font-display text-2xl font-semibold ${
                      trend === 'up' ? 'text-leaf' : 'text-coral'
                    }`}
                  >
                    {before} → {after}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-[1.5rem] bg-accent-focus p-4 text-sm font-semibold leading-7 text-ink/64">
            你最近条件转化略有提升，但复核检查下降，说明做题后检查环节仍不稳定。
          </p>
        </article>
      </section>
    </div>
  );
}
