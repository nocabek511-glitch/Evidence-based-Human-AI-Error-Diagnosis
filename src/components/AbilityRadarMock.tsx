import type { AbilityDimension } from '../data/mockData';
import Tag from './Tag';

type AbilityRadarMockProps = {
  data: AbilityDimension[];
};

const pointsFor = (data: AbilityDimension[], radius: number) => {
  const center = 120;
  return data
    .map((item, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / data.length;
      const distance = radius * (item.score / 100);
      return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
    })
    .join(' ');
};

const ringPoints = (count: number, radius: number) => {
  const center = 120;
  return Array.from({ length: count })
    .map((_, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(' ');
};

export default function AbilityRadarMock({ data }: AbilityRadarMockProps) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-6">
        <div>
          <Tag tone="grass">
            成长地图
          </Tag>
          <h3 className="mt-3 font-display text-[22px] font-semibold text-ink">
            六维能力成长值
          </h3>
          <p className="mt-3 max-w-md leading-7 text-ink/60">
            每次练习都会点亮一小格。薄弱项不是警报，是下一关入口。
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-modeling/25 bg-modelingSoft px-5 py-3 text-center">
          <p className="text-xs font-medium text-ink/55">综合等级</p>
          <p className="font-display text-2xl font-semibold text-ink">Lv. 7</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[280px_1fr] items-center gap-8">
        <div className="relative">
          <div className="absolute inset-8 rounded-full bg-calculationSoft blur-2xl" />
          <svg viewBox="0 0 240 240" className="relative h-72 w-72">
            {[96, 72, 48, 24].map((radius) => (
              <polygon
                fill={radius === 96 ? 'rgba(225, 232, 255, 0.42)' : 'none'}
                key={radius}
                points={ringPoints(data.length, radius)}
                stroke="rgba(47, 52, 59, 0.10)"
                strokeWidth="1.5"
              />
            ))}
            {data.map((_, index) => {
              const angle = -Math.PI / 2 + (index * 2 * Math.PI) / data.length;
              return (
                <line
                  key={index}
                  x1="120"
                  x2={120 + Math.cos(angle) * 96}
                  y1="120"
                  y2={120 + Math.sin(angle) * 96}
                  stroke="rgba(47, 52, 59, 0.08)"
                />
              );
            })}
            <polygon
              fill="rgba(155, 209, 197, 0.22)"
              points={pointsFor(data, 96)}
              stroke="#9BD1C5"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            {data.map((item, index) => {
              const angle = -Math.PI / 2 + (index * 2 * Math.PI) / data.length;
              const distance = 96 * (item.score / 100);
              return (
                <circle
                  cx={120 + Math.cos(angle) * distance}
                  cy={120 + Math.sin(angle) * distance}
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

        <div className="space-y-4">
          {data.map((item) => (
            <div className="rounded-[1.25rem] bg-chalk/80 p-4" key={item.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{item.name}</span>
                <Tag tone={item.score >= 80 ? 'grass' : item.score >= 70 ? 'sky' : 'sun'}>
                  {item.level}
                </Tag>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 flex-1 rounded-full bg-white">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span className="w-10 text-right font-display text-xl font-semibold" style={{ color: item.color }}>
                  {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
