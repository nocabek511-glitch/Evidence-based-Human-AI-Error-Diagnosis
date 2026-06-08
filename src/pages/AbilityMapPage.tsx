import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AbilityMascot, { type Ability } from '../components/AbilityMascot';
import FigmaAbilityStateDrawer, {
  type FigmaAbilityState,
} from '../components/FigmaAbilityStateDrawer';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { abilityMascots } from '../data/abilityMascots';
import { abilityCopy, coachCopy } from '../data/languageSystem';

type ProfileDimension = {
  id: string;
  ability: Ability;
  priority: number;
  name: string;
  status: string;
  score: number;
  trend: string;
  evidence: string;
  progress: number;
  highlighted?: boolean;
  evidenceDetail: string[];
  relatedProblems: string[];
};

type DimensionGroup = {
  id: 'urgent' | 'unstable' | 'stable';
  title: string;
  hint: string;
  visualWeight: 'strong' | 'medium' | 'light';
  items: ProfileDimension[];
};

type RadarDatum = {
  label: string;
  value: number;
  ability: Ability;
};

type LearnerProfile = {
  focus: {
    dimension: string;
    title: string;
    evidence: string;
  };
  dimensionGroups: DimensionGroup[];
  selfCheck: {
    title: string;
    description: string;
    status: string;
  };
};

const learnerProfile: LearnerProfile = {
  focus: {
    dimension: '条件转化',
    title: '最近最该补：把条件写成式子',
    evidence:
      '最近 10 道错题里，有 6 道卡在“文字条件 → 数学关系”。先把这一步练稳，后面建模会轻松很多。',
  },
  dimensionGroups: [
    {
      id: 'urgent',
      title: '需要先补',
      hint: '先处理这些，后面的题会顺很多。',
      visualWeight: 'strong',
      items: [
        {
          id: 'condition_translation',
          ability: 'translation',
          priority: 1,
          name: '条件转化',
          status: '需要重点练',
          score: 58,
          trend: '54 → 58',
          evidence: '10 题中 6 题卡住',
          progress: 0.58,
          highlighted: true,
          evidenceDetail: [
            '最近 10 道错题里，6 道卡在条件转化。',
            '其中 3 道是文字条件没有写成关系式。',
            '2 道是图形条件没有转成边角关系。',
            '1 道是范围条件漏掉。',
          ],
          relatedProblems: [
            '第 5 题：利润问题',
            '第 8 题：一次函数应用题',
            '第 13 题：几何条件转化',
          ],
        },
        {
          id: 'checking',
          ability: 'review',
          priority: 2,
          name: '复核检查',
          status: '容易漏掉',
          score: 49,
          trend: '52 → 49',
          evidence: '做完很少回看',
          progress: 0.49,
          evidenceDetail: [
            '最近 8 次练习里，4 次没有回到题目检查单位或范围。',
            '有 2 道题结果方向接近正确，但最后没有代回题意。',
            '检查步骤通常写得比较短，容易漏掉条件限制。',
          ],
          relatedProblems: [
            '第 20 题：结果范围检查',
            '第 24 题：图像交点含义',
            '第 26 题：单位换算',
          ],
        },
      ],
    },
    {
      id: 'unstable',
      title: '还不稳定',
      hint: '不用猛补，但要继续观察。',
      visualWeight: 'medium',
      items: [
        {
          id: 'model_construction',
          ability: 'model',
          priority: 3,
          name: '建立模型',
          status: '还不稳',
          score: 61,
          trend: '60 → 61',
          evidence: '常在关系式之后卡住',
          progress: 0.61,
          evidenceDetail: [
            '最近 10 道错题里，4 道在关系式写出后没有继续搭完整模型。',
            '一次函数和几何辅助线题里，模型选择还不够稳定。',
            '当题目换成新情境时，容易直接套旧公式。',
          ],
          relatedProblems: [
            '第 8 题：一次函数应用题',
            '第 16 题：几何辅助线',
            '第 22 题：二次函数建模',
          ],
        },
        {
          id: 'strategy_selection',
          ability: 'method',
          priority: 4,
          name: '方法选择',
          status: '基本稳定，但几何题还要看',
          score: 70,
          trend: '68 → 70',
          evidence: '几何题还要看',
          progress: 0.7,
          evidenceDetail: [
            '代数题的方法选择较稳定，几何证明题偶尔绕路。',
            '最近 6 道几何题里，2 道需要提示后才选到合适路线。',
            '遇到多条件题时，容易先算而不是先判断路线。',
          ],
          relatedProblems: [
            '第 16 题：平行线证明',
            '第 18 题：角度关系',
            '第 23 题：辅助线选择',
          ],
        },
      ],
    },
    {
      id: 'stable',
      title: '基本稳定',
      hint: '保持节奏，偶尔检查就好。',
      visualWeight: 'light',
      items: [
        {
          id: 'procedural_execution',
          ability: 'calculation',
          priority: 5,
          name: '计算执行',
          status: '较稳定',
          score: 76,
          trend: '74 → 76',
          evidence: '小错偶尔出现',
          progress: 0.76,
          evidenceDetail: [
            '大部分代数展开能完成，符号小错偶尔出现。',
            '最近 10 道题里，2 道因为负号或合并同类项出错。',
            '在时间紧的时候，计算步骤会变得更跳。',
          ],
          relatedProblems: [
            '第 10 题：代数展开',
            '第 21 题：二次函数化简',
            '第 27 题：方程计算',
          ],
        },
        {
          id: 'problem_understanding',
          ability: 'reading',
          priority: 6,
          name: '读题理解',
          status: '较稳定',
          score: 82,
          trend: '80 → 82',
          evidence: '最近错得少',
          progress: 0.82,
          evidenceDetail: [
            '最近 10 道错题里，只有 1 道主要卡在读题。',
            '题目要求通常能抓住，但复杂条件需要慢一点圈出来。',
            '应用题背景能理解，主要问题常出现在转写关系时。',
          ],
          relatedProblems: [
            '第 3 题：题干条件定位',
            '第 11 题：隐藏条件',
            '第 19 题：范围理解',
          ],
        },
      ],
    },
  ],
  selfCheck: {
    title: '自己找错能力',
    description:
      '本周你有 3 次先找对了卡点，还有 2 次是在系统提示后才发现。',
    status: '正在变稳',
  },
};

type NegotiationPhase =
  | 'basis'
  | 'understood'
  | 'evidence'
  | 'validation'
  | 'result';

type ResultSource = 'validation' | 'explanation' | 'record';

type ScoreUpdate = {
  abilityId: string;
  oldScore: number;
  newScore: number;
  delta: number;
  correctCount: number;
  totalCount: number;
  newStatus: string;
  message: string;
  nextStep: string;
};

const validationTasks = [
  {
    title: '小验证 1',
    description: '找出题目中的关键条件',
  },
  {
    title: '小验证 2',
    description: '选择正确的关系式',
  },
  {
    title: '小验证 3',
    description: '简单解释为什么这样列式',
  },
];

const advancedValidationTasks = [
  {
    title: '进阶验证 1',
    description: '在新题面里找出两个变化量',
  },
  {
    title: '进阶验证 2',
    description: '把变化量写成完整关系式',
  },
  {
    title: '进阶验证 3',
    description: '说明这个关系式为什么适合题意',
  },
];

const basisEvidence = [
  '这道题中，关键条件没有转成可用关系式。',
  '最近 3 道同类题里，有 2 道都卡在条件提取或条件使用。',
  '订正中补上了计算过程，但没有说明为什么这样列式。',
];

const radarData: RadarDatum[] = [
  { label: '读题理解', value: 82, ability: 'reading' },
  { label: '条件转化', value: 58, ability: 'translation' },
  { label: '建立模型', value: 61, ability: 'model' },
  { label: '方法选择', value: 70, ability: 'method' },
  { label: '计算执行', value: 76, ability: 'calculation' },
  { label: '复核检查', value: 49, ability: 'review' },
];

const radarSummary =
  '你的读题和计算比较稳，但条件转化、复核检查还需要补。今天建议先练「条件转化」。';

const getRadarPoint = (
  index: number,
  total: number,
  radius: number,
  center = 80,
) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
};

function MiniRadar({ data }: { data: RadarDatum[] }) {
  const center = 80;
  const maxRadius = 54;
  const polygon = data
    .map((item, index) => {
      const point = getRadarPoint(
        index,
        data.length,
        (item.value / 100) * maxRadius,
        center,
      );
      return `${point.x},${point.y}`;
    })
    .join(' ');

  const gridLevels = [0.33, 0.66, 1];

  return (
    <svg
      aria-label="六维能力雷达图"
      className="h-[190px] w-full max-w-[230px]"
      role="img"
      viewBox="0 0 160 160"
    >
      {gridLevels.map((level) => (
        <polygon
          className="fill-none stroke-ink/8"
          key={level}
          points={data
            .map((_, index) => {
              const point = getRadarPoint(
                index,
                data.length,
                maxRadius * level,
                center,
              );
              return `${point.x},${point.y}`;
            })
            .join(' ')}
          strokeWidth="1"
        />
      ))}

      {data.map((item, index) => {
        const axis = getRadarPoint(index, data.length, maxRadius, center);
        const label = getRadarPoint(index, data.length, maxRadius + 18, center);
        const meta = abilityMascots[item.ability];
        return (
          <g key={item.label}>
            <line
              className="stroke-ink/8"
              strokeWidth="1"
              x1={center}
              x2={axis.x}
              y1={center}
              y2={axis.y}
            />
            <circle cx={axis.x} cy={axis.y} fill={meta.color} r="2.5" />
            <text
              className="fill-ink/45 text-[8px] font-medium"
              textAnchor="middle"
              x={label.x}
              y={label.y}
            >
              {item.label}
            </text>
          </g>
        );
      })}

      <polygon
        fill="rgba(155, 209, 197, 0.24)"
        points={polygon}
        stroke="#9BD1C5"
        strokeLinejoin="round"
        strokeWidth="2"
      />

      {data.map((item, index) => {
        const point = getRadarPoint(
          index,
          data.length,
          (item.value / 100) * maxRadius,
          center,
        );
        return (
          <circle
            fill={abilityMascots[item.ability].color}
            key={item.label}
            r="3"
            stroke="white"
            strokeWidth="1.5"
            cx={point.x}
            cy={point.y}
          />
        );
      })}
    </svg>
  );
}

export default function AbilityMapPage() {
  const [searchParams] = useSearchParams();
  const requestedFigmaState = searchParams.get('figmaState');
  const figmaState = (
    [
      'negotiation-basis',
      'negotiation-validation',
      'negotiation-result',
      'negotiation-continue',
      'ability-negotiation-start',
      'ability-negotiation-understood',
      'ability-negotiation-evidence',
      'ability-negotiation-system-basis',
      'ability-negotiation-validation',
      'ability-negotiation-result',
      'ability-negotiation-continue',
      'ability-negotiation-continue-result',
      'ability-negotiation-confirmed',
    ] as FigmaAbilityState[]
  ).find((state) => state === requestedFigmaState);
  const [evidenceTarget, setEvidenceTarget] =
    useState<ProfileDimension | null>(null);
  const [challengeTarget, setChallengeTarget] =
    useState<ProfileDimension | null>(null);
  const [negotiationPhase, setNegotiationPhase] =
    useState<NegotiationPhase>('basis');
  const [explanationText, setExplanationText] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [evidenceHint, setEvidenceHint] = useState('');
  const [basisOpen, setBasisOpen] = useState(false);
  const [resultSource, setResultSource] = useState<ResultSource>('validation');
  const [validationRound, setValidationRound] = useState<1 | 2>(1);
  const [validationResults, setValidationResults] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [scoreUpdates, setScoreUpdates] = useState<Record<string, ScoreUpdate>>(
    {},
  );

  const dimensionGroups = learnerProfile.dimensionGroups;
  const dimensions = dimensionGroups.flatMap((group) => group.items);
  const focusDimension = dimensions[0];
  const getDisplayScore = (dimension: ProfileDimension) =>
    scoreUpdates[dimension.id]?.newScore ?? dimension.score;
  const getDisplayTrend = (dimension: ProfileDimension) =>
    scoreUpdates[dimension.id]?.delta > 0
      ? `${scoreUpdates[dimension.id].oldScore} → ${scoreUpdates[dimension.id].newScore}`
      : dimension.trend;
  const getDisplayProgress = (dimension: ProfileDimension) =>
    getDisplayScore(dimension) / 100;
  const displayRadarData = radarData.map((item) =>
    item.label === '条件转化'
      ? {
          ...item,
          value: scoreUpdates.condition_translation?.newScore ?? item.value,
        }
      : item,
  );

  const openChallenge = (dimension: ProfileDimension) => {
    setChallengeTarget(dimension);
    setNegotiationPhase('basis');
    setExplanationText('');
    setEvidenceText('');
    setEvidenceHint('');
    setBasisOpen(false);
    setResultSource('validation');
    setValidationRound(1);
    setValidationResults([false, false, false]);
  };

  const startValidation = (round: 1 | 2 = 1) => {
    setResultSource('validation');
    setValidationRound(round);
    setValidationResults([false, false, false]);
    setEvidenceHint('');
    setNegotiationPhase('validation');
  };

  const submitInitialIdea = () => {
    const idea = explanationText.trim();
    if (!idea) {
      setEvidenceHint('先说一句你觉得哪里不合理，系统才能重新看。');
      return;
    }
    setEvidenceHint('');
    setNegotiationPhase('understood');
  };

  const submitEvidenceExplanation = () => {
    const evidence = evidenceText.trim();
    if (evidence.length < 10 || /我觉得不是|不准|不是/.test(evidence)) {
      setEvidenceHint(coachCopy.negotiation.needsEvidence);
      return;
    }

    setResultSource('explanation');
    setNegotiationPhase('result');
  };

  const toggleValidationResult = (index: number, value: boolean) => {
    setValidationResults((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const passedCount = validationResults.filter(Boolean).length;
  const currentValidationTasks =
    validationRound === 1 ? validationTasks : advancedValidationTasks;
  const getMiniCheckResult = (
    dimension: ProfileDimension | null,
    correctCount: number,
  ): ScoreUpdate => {
    const oldScore = dimension ? getDisplayScore(dimension) : 58;
    const delta = correctCount >= 3 ? 2 : correctCount === 2 ? 1 : 0;
    const newScore = Math.min(100, oldScore + delta);
    const abilityName = dimension?.name ?? '条件转化';
    const newStatus =
      correctCount >= 3
        ? '正在变稳'
        : correctCount === 2
          ? '待观察'
          : correctCount === 1
            ? '继续观察'
            : '继续重点练';
    const message =
      correctCount >= 3
        ? `你这次 3 个小任务都做对了。系统会先给「${abilityName}」小幅加分，并把这次表现加入记录。`
        : correctCount === 2
          ? '你这次大部分做对了，但还不算完全稳定。系统会先小幅更新，并继续观察后面的同类题。'
          : correctCount === 1
            ? '这次还不够稳定，系统先不改分数。可以再练一小组，再回来验证。'
            : '这一步还需要再补。先练几道“把题里的话写成式子”的小任务，再回来验证。';
    const nextStep =
      correctCount >= 2
        ? '再做 1–2 道同类题，如果继续稳定，系统会继续更新画像。'
        : '先做一小组条件转写练习，再回来验证会更稳。';

    return {
      abilityId: dimension?.id ?? 'condition_translation',
      oldScore,
      newScore,
      delta,
      correctCount,
      totalCount: 3,
      newStatus,
      message,
      nextStep,
    };
  };
  const miniCheckResult =
    resultSource === 'validation'
      ? challengeTarget
        ? scoreUpdates[challengeTarget.id] ??
          getMiniCheckResult(challengeTarget, passedCount)
        : getMiniCheckResult(null, passedCount)
      : null;

  const validationOutcome = useMemo(() => {
    if (resultSource !== 'validation') {
      return {
        resultLine: '你补充的信息有用',
        updateLine: '状态更新：先标记为“正在变稳”',
        reason:
          resultSource === 'record'
            ? '这次先保存你的想法。后续同类练习里，系统会继续看你是否能稳定完成这一步。'
            : '系统会把这次表现加入记录。长期画像不会因为一次说明大幅变化，但后续同类题会更快更新。',
      };
    }

    if (validationRound === 2) {
      if (passedCount >= 3) {
        return {
          resultLine: '小验证结果：正在变稳',
          updateLine: '状态更新：进阶验证也比较稳定',
          reason:
            '你在更换题面后仍能找到变化量、写出关系式并解释理由。系统会先把这次表现加入记录，后续还要看真实练习是否继续稳定。',
        };
      }

      if (passedCount === 2) {
        return {
          resultLine: '小验证结果：待观察',
          updateLine: '状态更新：有进步，但还要再看',
          reason:
            '这轮表现比原判断更稳定，但解释环节还需要继续确认。系统会结合后续真实错题继续看。',
        };
      }

      return {
        resultLine: '小验证结果：继续重点练',
        updateLine: '状态更新：先不调整长期画像',
        reason:
          '这轮证据还不足以说明已经稳定。建议先把条件转化微练习做稳，再重新确认。',
      };
    }

    if (passedCount >= 3) {
      return {
        resultLine: '小验证结果：正在变稳',
        updateLine: '状态更新：先标记为“正在变稳”',
        reason:
          '你在条件提取、关系式转化和解释题中都表现稳定。系统会先把这次表现加入记录，后续如果继续稳定，会更新为更稳定的画像。',
      };
    }

    if (passedCount === 2) {
      return {
        resultLine: '小验证结果：待观察',
        updateLine: '状态更新：有一部分表现变稳',
        reason:
          '你能完成部分微任务，说明这个判断可以继续看。系统先记录这次表现，后续练习会继续确认。',
      };
    }

    return {
      resultLine: '小验证结果：继续重点练',
      updateLine: '状态更新：暂不调整长期画像',
      reason:
        '你的想法会被保留，但目前证据还不够支持更新判断。建议先完成 2 道条件转化微练习，再重新确认。',
    };
  }, [passedCount, resultSource, validationRound]);

  const phaseIndex =
    negotiationPhase === 'basis'
      ? 0
      : negotiationPhase === 'result'
        ? 2
        : 1;

  const closeChallenge = () => {
    setChallengeTarget(null);
  };

  const continueValidation = () => {
    startValidation(resultSource === 'validation' ? 2 : 1);
  };

  const progressWidth = useMemo(
    () => (score: number) => `${Math.max(8, Math.min(score, 100))}%`,
    [],
  );

  return (
    <>
      <div className="mx-auto max-w-[960px] space-y-5">
        <section className="rounded-[2rem] border border-translation/20 bg-white p-6 shadow-card ring-4 ring-translation/10">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_120px]">
            <div>
              <Tag type="info">最近最该补</Tag>
              <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-ink">
                {learnerProfile.focus.title}
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/60">
                {learnerProfile.focus.evidence}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <PrimaryButton to="/practice">去练这一块</PrimaryButton>
                <SecondaryButton to="/mistakes">看相关错题</SecondaryButton>
                <SecondaryButton onClick={() => openChallenge(focusDimension)}>
                  我觉得不是这里
                </SecondaryButton>
              </div>
            </div>
            <div className="hidden rounded-[1.5rem] bg-accent-focus p-3 md:block">
              <AbilityMascot ability="translation" size="card" />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
            <div className="rounded-[1.5rem] bg-chalk px-3 py-4">
              <MiniRadar data={displayRadarData} />
            </div>
            <div>
              <Tag type="neutral">六维总览</Tag>
              <p className="mt-4 text-[15px] leading-7 text-ink/62">
                {radarSummary}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {displayRadarData.map((item) => (
                  <div
                    className="rounded-2xl border border-ink/8 bg-white px-3 py-2"
                    key={item.label}
                  >
                    <p className="text-xs font-medium text-ink/40">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink/68">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Tag type="neutral">最近 30 天学习画像</Tag>
              <p className="mt-3 text-sm leading-6 text-ink/48">
                基于错题、练习和小验证记录
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {dimensionGroups.map((group) => (
              <section
                className={`rounded-[1.5rem] border p-4 ${
                  group.visualWeight === 'strong'
                    ? 'border-translation/20 bg-accent-focus/45'
                    : group.visualWeight === 'medium'
                      ? 'border-ink/8 bg-chalk/55'
                      : 'border-ink/8 bg-white'
                }`}
                key={group.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-ink">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-ink/42">
                      {group.hint}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/40">
                    {group.items.length} 项
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {group.items.map((dimension) => {
                    const meta = abilityMascots[dimension.ability];
                    const update = scoreUpdates[dimension.id];
                    const displayScore = getDisplayScore(dimension);
                    const displayTrend = getDisplayTrend(dimension);
                    const displayProgress = getDisplayProgress(dimension);
                    const cardStyle = dimension.highlighted
                      ? {
                          backgroundColor: meta.lightColor,
                          borderColor: `${meta.color}88`,
                        }
                      : undefined;

                    return (
                      <article
                        className={`rounded-[1.35rem] border p-4 transition hover:-translate-y-0.5 ${
                          dimension.highlighted
                            ? 'shadow-[0_10px_26px_rgba(47,52,59,0.06)]'
                            : group.visualWeight === 'light'
                              ? 'border-ink/8 bg-white/70 opacity-85'
                              : 'border-ink/8 bg-white'
                        }`}
                        key={dimension.id}
                        style={cardStyle}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-start gap-3">
                            <AbilityMascot
                              ability={dimension.ability}
                              size="avatar"
                            />
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/75 px-2.5 py-1 text-xs font-semibold text-ink/52">
                                  #{dimension.priority}
                                </span>
                                <p className="text-base font-semibold text-ink">
                                  {dimension.name}
                                </p>
                              </div>
                              <p className="mt-1 text-xs leading-5 text-ink/48">
                                {abilityCopy[dimension.ability].action}
                              </p>
                              <p className="mt-2 text-sm font-semibold leading-6 text-ink/72">
                                {dimension.status}
                              </p>
                            </div>
                          </div>
                          <p className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-ink/38">
                            {displayScore} · {displayTrend}
                          </p>
                        </div>

                        <p className="mt-4 text-[15px] font-semibold leading-6 text-ink/70">
                          {dimension.evidence}
                        </p>

                        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/80">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: meta.color,
                              width: progressWidth(displayProgress * 100),
                            }}
                          />
                        </div>

                        {update ? (
                          <div className="mt-3 inline-flex rounded-full bg-accent-action px-3 py-1 text-xs font-semibold text-ink/68">
                            {update.delta > 0
                              ? `刚刚 +${update.delta}`
                              : '刚刚验证'}
                          </div>
                        ) : null}

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            className="rounded-full border border-ink/12 bg-white px-3.5 py-2 text-xs font-semibold text-ink/62 shadow-[0_4px_12px_rgba(47,52,59,0.035)] transition hover:-translate-y-0.5 hover:bg-chalk hover:text-ink"
                            onClick={() => setEvidenceTarget(dimension)}
                            type="button"
                          >
                            查看依据 →
                          </button>
                          <button
                            className="rounded-full border border-translation/25 bg-accent-focus/70 px-3.5 py-2 text-xs font-semibold text-ink/68 shadow-[0_4px_12px_rgba(47,52,59,0.03)] transition hover:-translate-y-0.5 hover:bg-accent-focus hover:text-ink"
                            onClick={() => openChallenge(dimension)}
                            type="button"
                          >
                            我觉得不准
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>

      {evidenceTarget ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/18 backdrop-blur-sm">
          <aside className="flex h-full w-full max-w-[430px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
              <div>
                <Tag type="info">查看依据</Tag>
                <h2 className="mt-3 text-xl font-semibold text-ink">
                  为什么这样判断？
                </h2>
              </div>
              <button
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={() => setEvidenceTarget(null)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="flex items-center gap-3">
                <AbilityMascot ability={evidenceTarget.ability} size="inline" />
                <div>
                  <p className="text-sm text-ink/42">能力名</p>
                  <p className="text-lg font-semibold text-ink">
                    {evidenceTarget.name}
                  </p>
                </div>
              </div>

              <section className="mt-5">
                <p className="text-sm font-semibold text-ink">系统看到的依据</p>
                <div className="mt-3 space-y-2">
                  {evidenceTarget.evidenceDetail.map((item, index) => (
                    <div
                      className="rounded-2xl bg-chalk px-4 py-3 text-sm leading-6 text-ink/60"
                      key={item}
                    >
                      {index + 1}. {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <p className="text-sm font-semibold text-ink">相关错题</p>
                <div className="mt-3 space-y-2">
                  {evidenceTarget.relatedProblems.map((problem) => (
                    <p
                      className="rounded-2xl border border-ink/8 bg-white px-4 py-3 text-sm text-ink/58"
                      key={problem}
                    >
                      {problem}
                    </p>
                  ))}
                </div>
              </section>
            </div>

            <div className="border-t border-ink/8 px-5 py-4">
              <div className="flex flex-wrap justify-end gap-3">
                <SecondaryButton to="/mistakes">看相关错题</SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    openChallenge(evidenceTarget);
                    setEvidenceTarget(null);
                  }}
                >
                  我觉得不准
                </PrimaryButton>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {challengeTarget ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/18 backdrop-blur-sm">
          <aside className="flex h-full w-full max-w-[500px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
              <div>
                <Tag type="info">重新看看</Tag>
                <h2 className="mt-3 text-xl font-semibold text-ink">
                  {coachCopy.negotiation.title}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-ink/52">
                  {coachCopy.negotiation.subtitle}
                </p>
              </div>
              <button
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={closeChallenge}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="flex items-center gap-2 rounded-full bg-chalk px-3 py-2">
                {['说想法', '补依据或验证', '反馈'].map((step, index) => (
                  <div className="flex min-w-0 flex-1 items-center gap-2" key={step}>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                        index <= phaseIndex
                          ? 'bg-accent-action text-ink'
                          : 'bg-white text-ink/35'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`truncate text-xs font-medium ${
                        index <= phaseIndex ? 'text-ink/70' : 'text-ink/35'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {negotiationPhase === 'basis' ? (
                <section className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                  <p className="text-sm font-semibold text-ink">
                    {coachCopy.negotiation.ideaLabel}
                  </p>
                  <textarea
                    className="mt-3 min-h-36 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
                    onChange={(event) => {
                      setExplanationText(event.target.value);
                      setEvidenceHint('');
                    }}
                    placeholder={coachCopy.negotiation.ideaPlaceholder}
                    value={explanationText}
                  />

                  {evidenceHint ? (
                    <div className="mt-3 rounded-[1.25rem] border border-model/25 bg-accent-warning/70 px-4 py-3 text-sm leading-6 text-ink/62">
                      {evidenceHint}
                    </div>
                  ) : null}

                  <button
                    className="mt-4 text-sm font-medium text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink"
                    onClick={() => setBasisOpen((value) => !value)}
                    type="button"
                  >
                    {basisOpen ? '收起系统依据' : '查看系统依据'}
                  </button>

                  {basisOpen ? (
                    <div className="mt-3 rounded-[1.25rem] border border-ink/8 bg-chalk/65 px-4 py-3">
                      <p className="text-xs font-medium text-ink/38">
                        关于：{challengeTarget.name} · 当前 62 · 系统有多确定：中等
                      </p>
                      <p className="mt-3 text-sm font-semibold text-ink">
                        系统目前看到
                      </p>
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
                    </div>
                  ) : null}
                </section>
              ) : null}

              {negotiationPhase === 'understood' ? (
                <section className="mt-5 space-y-4">
                  <div className="rounded-[1.5rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                    <p className="font-medium text-ink">我理解你的意思是：</p>
                    <p className="mt-1">
                      “你觉得【{challengeTarget.name}】这个判断需要重新看，因为：{explanationText.trim()}”
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-ink/8 bg-white px-4 py-3 text-sm leading-7 text-ink/62">
                    这个可以重新看。接下来你可以补充一点依据，或者做一个小验证。
                  </div>

                  <button
                    className="text-sm font-medium text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink"
                    onClick={() => setBasisOpen((value) => !value)}
                    type="button"
                  >
                    {basisOpen ? '收起系统依据' : '查看系统依据'}
                  </button>

                  {basisOpen ? (
                    <div className="rounded-[1.25rem] border border-ink/8 bg-chalk/65 px-4 py-3">
                      <p className="text-xs font-medium text-ink/38">
                        关于：{challengeTarget.name} · 当前 62 · 系统有多确定：中等
                      </p>
                      <p className="mt-3 text-sm font-semibold text-ink">
                        系统目前看到
                      </p>
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
                    </div>
                  ) : null}
                </section>
              ) : null}

              {negotiationPhase === 'evidence' ? (
                <section className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                  <p className="text-base font-semibold text-ink">
                    补充一点依据
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/48">
                    可以写系统漏看的地方，比如哪道题、哪一步、最近哪次练习表现。
                  </p>
                  <textarea
                    className="mt-4 min-h-32 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
                    onChange={(event) => {
                      setEvidenceText(event.target.value);
                      setEvidenceHint('');
                    }}
                    placeholder="比如：第 8 题里我已经写出了销量关系，真正出错是在后面展开计算。"
                    value={evidenceText}
                  />
                  {evidenceHint ? (
                    <div className="mt-3 rounded-[1.25rem] border border-model/25 bg-accent-warning/70 px-4 py-3 text-sm leading-6 text-ink/62">
                      {evidenceHint}
                    </div>
                  ) : null}
                </section>
              ) : null}

              {negotiationPhase === 'validation' ? (
                <section className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {validationRound === 1
                          ? '做 3 道小验证'
                          : '再做一轮进阶验证'}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-ink/45">
                        {validationRound === 1
                          ? '不做完整大题，只看这一步是否稳定。'
                          : '如果你觉得这个能力还可以更高，可以再做一轮稍难一点的小验证。'}
                      </p>
                    </div>
                    <span className="rounded-full bg-accent-action px-3 py-1 text-xs font-semibold text-ink/62">
                      {passedCount}/3 通过
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {currentValidationTasks.map((task, index) => (
                      <article
                        className="rounded-2xl border border-ink/8 bg-chalk/65 px-4 py-3"
                        key={task.title}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              {task.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-ink/55">
                              {task.description}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                              validationResults[index]
                                ? 'bg-accent-action text-ink/68'
                                : 'bg-white text-ink/35'
                            }`}
                          >
                            {validationResults[index] ? '通过' : '未通过'}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                              validationResults[index]
                                ? 'border-calculation/35 bg-accent-action text-ink'
                                : 'border-ink/10 bg-white text-ink/50 hover:bg-accent-action'
                            }`}
                            onClick={() => toggleValidationResult(index, true)}
                            type="button"
                          >
                            通过
                          </button>
                          <button
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                              !validationResults[index]
                                ? 'border-ink/12 bg-white text-ink/62'
                                : 'border-ink/10 bg-white text-ink/42 hover:bg-chalk'
                            }`}
                            onClick={() => toggleValidationResult(index, false)}
                            type="button"
                          >
                            未通过
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {negotiationPhase === 'result' ? (
                <section className="mt-5 rounded-[1.5rem] border border-calculation/20 bg-accent-action/70 p-4">
                  {miniCheckResult ? (
                    <>
                      <Tag type="success">小验证结果</Tag>
                      <div className="mt-4 rounded-[1.35rem] bg-white/80 px-4 py-4">
                        <div className="flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink/48">
                              {challengeTarget?.name ?? '条件转化'}
                            </p>
                            <p className="mt-2 text-[32px] font-semibold leading-none tracking-tight text-ink">
                              {miniCheckResult.oldScore}
                              <span className="mx-2 text-ink/28">→</span>
                              {miniCheckResult.newScore}
                            </p>
                          </div>
                          <span className="rounded-full bg-accent-action px-3 py-1.5 text-sm font-semibold text-ink/70">
                            {miniCheckResult.delta > 0
                              ? `+${miniCheckResult.delta}`
                              : '暂不加分'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl bg-white/65 px-4 py-3">
                          <p className="text-xs font-medium text-ink/38">
                            本次小验证
                          </p>
                          <p className="mt-1 text-lg font-semibold text-ink">
                            {miniCheckResult.correctCount}/
                            {miniCheckResult.totalCount}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/65 px-4 py-3">
                          <p className="text-xs font-medium text-ink/38">状态</p>
                          <p className="mt-1 text-lg font-semibold text-ink">
                            {miniCheckResult.newStatus}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-ink/62">
                        {miniCheckResult.message}
                      </p>
                      <p className="mt-3 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-6 text-ink/58">
                        长期画像不会因为一次小验证大幅变化，但这次表现会加入记录。
                      </p>
                      <p className="mt-3 text-sm leading-7 text-ink/62">
                        {miniCheckResult.nextStep}
                      </p>
                    </>
                  ) : (
                    <>
                      <Tag type="success">临时更新</Tag>
                      <h3 className="mt-3 text-lg font-semibold text-ink">
                        {validationOutcome.resultLine}
                      </h3>
                      <p className="mt-3 rounded-2xl bg-white/75 px-4 py-3 text-sm font-semibold leading-6 text-ink/72">
                        {validationOutcome.updateLine}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-ink/62">
                        {validationOutcome.reason}
                      </p>
                    </>
                  )}
                </section>
              ) : null}
            </div>

            <div className="border-t border-ink/8 px-5 py-4">
              {negotiationPhase === 'basis' ? (
                <div className="flex flex-wrap justify-end gap-3">
                  <SecondaryButton onClick={closeChallenge}>先返回</SecondaryButton>
                  <PrimaryButton onClick={submitInitialIdea}>
                    提交想法
                  </PrimaryButton>
                </div>
              ) : null}

              {negotiationPhase === 'understood' ? (
                <div className="flex flex-wrap justify-end gap-3">
                  <SecondaryButton onClick={closeChallenge}>先返回</SecondaryButton>
                  <SecondaryButton
                    onClick={() => {
                      setEvidenceHint('');
                      setNegotiationPhase('evidence');
                    }}
                  >
                    补充依据
                  </SecondaryButton>
                  <PrimaryButton onClick={() => startValidation(1)}>
                    做小验证
                  </PrimaryButton>
                </div>
              ) : null}

              {negotiationPhase === 'evidence' ? (
                <div className="flex flex-wrap justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setEvidenceHint('');
                      setNegotiationPhase('understood');
                    }}
                  >
                    返回上一步
                  </SecondaryButton>
                  <PrimaryButton onClick={submitEvidenceExplanation}>
                    提交依据
                  </PrimaryButton>
                </div>
              ) : null}

              {negotiationPhase === 'validation' ? (
                <div className="flex flex-wrap justify-end gap-3">
                  <SecondaryButton
                    onClick={() => {
                      setNegotiationPhase('understood');
                      setEvidenceHint('');
                    }}
                  >
                    返回上一步
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={() => {
                      setResultSource('validation');
                      if (challengeTarget) {
                        const result = getMiniCheckResult(
                          challengeTarget,
                          passedCount,
                        );
                        setScoreUpdates((current) => ({
                          ...current,
                          [challengeTarget.id]: result,
                        }));
                      }
                      setNegotiationPhase('result');
                    }}
                  >
                    完成验证
                  </PrimaryButton>
                </div>
              ) : null}

              {negotiationPhase === 'result' ? (
                <div className="flex flex-wrap justify-end gap-3">
                  {resultSource === 'validation' ? (
                    <>
                      <SecondaryButton to="/practice">去练这一块</SecondaryButton>
                      <SecondaryButton onClick={closeChallenge}>
                        返回我的进步
                      </SecondaryButton>
                      {validationRound === 1 ? (
                        <PrimaryButton onClick={continueValidation}>
                          {coachCopy.negotiation.continueValidation}
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton onClick={closeChallenge}>完成确认</PrimaryButton>
                      )}
                    </>
                  ) : (
                    <>
                      <SecondaryButton onClick={closeChallenge}>
                        返回能力图
                      </SecondaryButton>
                      <SecondaryButton onClick={() => startValidation(1)}>
                        做小验证
                      </SecondaryButton>
                      <PrimaryButton onClick={closeChallenge}>更新记录</PrimaryButton>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}

      {figmaState ? <FigmaAbilityStateDrawer state={figmaState} /> : null}
    </>
  );
}
