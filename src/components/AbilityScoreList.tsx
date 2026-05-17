import Tag from './Tag';

export type AbilityScoreItem = {
  name: string;
  score: number;
  description?: string;
};

type AbilityScoreListProps = {
  items?: AbilityScoreItem[];
  title?: string;
  activeDimension?: string;
  className?: string;
};

const defaultItems: AbilityScoreItem[] = [
  { name: '读题理解', score: 82, description: '能抓住题目问什么' },
  { name: '条件转化', score: 68, description: '文字条件转关系式' },
  { name: '建立模型', score: 74, description: '画图、列式、建模' },
  { name: '方法选择', score: 76, description: '选对解题路径' },
  { name: '计算执行', score: 71, description: '过程稳定少失误' },
  { name: '复核检查', score: 88, description: '会回看答案合理性' },
];

const getTagType = (score: number) => {
  if (score >= 85) return 'success';
  if (score >= 75) return 'info';
  if (score >= 65) return 'warning';
  return 'danger';
};

const getLabel = (score: number) => {
  if (score >= 85) return '已点亮';
  if (score >= 75) return '稳定中';
  if (score >= 65) return '待加强';
  return '优先修复';
};

const abilityAccents = [
  {
    active: 'bg-readingSoft ring-2 ring-reading/30',
    track: 'bg-readingSoft',
    bar: 'bg-reading',
  },
  {
    active: 'bg-translationSoft ring-2 ring-translation/30',
    track: 'bg-translationSoft',
    bar: 'bg-translation',
  },
  {
    active: 'bg-modelingSoft ring-2 ring-modeling/35',
    track: 'bg-modelingSoft',
    bar: 'bg-modeling',
  },
  {
    active: 'bg-methodSoft ring-2 ring-method/30',
    track: 'bg-methodSoft',
    bar: 'bg-method',
  },
  {
    active: 'bg-calculationSoft ring-2 ring-calculation/30',
    track: 'bg-calculationSoft',
    bar: 'bg-calculation',
  },
  {
    active: 'bg-reviewSoft ring-2 ring-review/30',
    track: 'bg-reviewSoft',
    bar: 'bg-review',
  },
];

export default function AbilityScoreList({
  items = defaultItems,
  title = '六维能力分数',
  activeDimension,
  className = '',
}: AbilityScoreListProps) {
  return (
    <section
      className={`rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink/45">
            Ability Scores
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">
            {title}
          </h3>
        </div>
        <Tag type="info">
          成长地图
        </Tag>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => {
          const isActive = activeDimension === item.name;
          const accent = abilityAccents[index % abilityAccents.length];
          return (
            <div
              className={`rounded-[1.5rem] border p-4 transition ${
                isActive
                  ? `${accent.active} border-transparent`
                  : 'border-ink/8 bg-white hover:bg-chalk'
              }`}
              key={item.name}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  {item.description ? (
                    <p className="mt-1 text-sm font-semibold text-ink/55">
                      {item.description}
                    </p>
                  ) : null}
                </div>
                <Tag type={getTagType(item.score)}>{getLabel(item.score)}</Tag>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className={`h-3 flex-1 rounded-full ${accent.track}`}>
                  <div
                    className={`h-3 rounded-full ${accent.bar}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <strong className="w-12 text-right font-display text-2xl font-semibold text-ink">
                  {item.score}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
