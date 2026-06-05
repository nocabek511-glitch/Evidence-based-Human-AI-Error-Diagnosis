import type { Mistake } from '../data/mockData';
import AbilityMascot, { type Ability } from './AbilityMascot';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag, { type TagType } from './Tag';
import { useLanguage } from '../i18n/LanguageContext';

export type MistakeStatus =
  | '待复习'
  | '需要巩固'
  | '需重做'
  | '已掌握'
  | '练习中';

type MistakeCardProps = {
  title?: string;
  knowledgePoint?: string;
  mainReason?: string;
  brokenStep?: string;
  mastery?: string | number;
  lastPracticedAt?: string;
  practiceCount?: number;
  status?: MistakeStatus;
  mistake?: Mistake;
  detailTo?: string;
  retryTo?: string;
  variantTo?: string;
  onViewDetail?: () => void;
  onRetry?: () => void;
  onVariantPractice?: () => void;
};

const statusType: Record<MistakeStatus, TagType> = {
  待复习: 'warning',
  需要巩固: 'info',
  需重做: 'danger',
  已掌握: 'success',
  练习中: 'info',
};

const inferStatus = (mastery: string | number): MistakeStatus => {
  if (typeof mastery === 'string') {
    if (mastery.includes('L5') || mastery.includes('L4')) return '已掌握';
    if (mastery.includes('L3')) return '需要巩固';
    return '待复习';
  }

  if (mastery >= 85) return '已掌握';
  if (mastery >= 70) return '练习中';
  return '待复习';
};

const masteryScore = (mastery: string | number) => {
  if (typeof mastery === 'number') return mastery;
  if (mastery.includes('L5')) return 96;
  if (mastery.includes('L4')) return 86;
  if (mastery.includes('L3')) return 74;
  if (mastery.includes('L2')) return 56;
  return 32;
};

const inferAbility = (text: string): Ability => {
  if (
    text.includes('读题') ||
    text.includes('理解') ||
    text.includes('识别') ||
    text.includes('Understanding')
  ) {
    return 'reading';
  }
  if (
    text.includes('条件') ||
    text.includes('转化') ||
    text.includes('表达式') ||
    text.includes('Condition') ||
    text.includes('Translation')
  ) {
    return 'translation';
  }
  if (text.includes('模型') || text.includes('建模') || text.includes('Model')) {
    return 'model';
  }
  if (
    text.includes('方法') ||
    text.includes('选择') ||
    text.includes('逻辑') ||
    text.includes('Strategy')
  ) {
    return 'method';
  }
  if (text.includes('计算') || text.includes('Execution')) {
    return 'calculation';
  }
  if (
    text.includes('复核') ||
    text.includes('检查') ||
    text.includes('Monitoring') ||
    text.includes('Checking')
  ) {
    return 'review';
  }
  return 'translation';
};

const statusKey: Record<MistakeStatus, string> = {
  待复习: 'To Review',
  需要巩固: 'Needs Practice',
  需重做: 'Retry',
  已掌握: 'Mastered',
  练习中: 'In Practice',
};

export default function MistakeCard({
  title,
  knowledgePoint,
  mainReason,
  brokenStep,
  mastery,
  lastPracticedAt,
  practiceCount,
  status,
  mistake,
  detailTo,
  retryTo = '/practice',
  variantTo = '/practice',
  onViewDetail,
  onRetry,
  onVariantPractice,
}: MistakeCardProps) {
  const { t, isEnglish } = useLanguage();
  const resolvedMastery = mastery ?? mistake?.mastery ?? 'L2 初步掌握';
  const resolvedStatus = status ?? inferStatus(resolvedMastery);
  const resolvedTitle = title ?? mistake?.title ?? '未命名错题';
  const resolvedKnowledgePoint =
    knowledgePoint ?? mistake?.tags?.join(' / ') ?? '知识点待识别';
  const resolvedMainReason =
    mainReason ?? mistake?.reason ?? '这一步卡住了，我们先把它拆开。';
  const resolvedBrokenStep = brokenStep ?? mistake?.tags?.[1] ?? '条件转化';
  const resolvedLastPracticedAt = lastPracticedAt ?? '今天';
  const resolvedPracticeCount = practiceCount ?? 0;
  const progress = masteryScore(resolvedMastery);
  const reasonAbility = inferAbility(`${resolvedMainReason} ${resolvedBrokenStep}`);

  return (
    <article className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Tag type="info">{resolvedKnowledgePoint}</Tag>
            <Tag type={statusType[resolvedStatus]}>
              {isEnglish ? statusKey[resolvedStatus] : resolvedStatus}
            </Tag>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink">{resolvedTitle}</h3>
        </div>

        <div className="shrink-0 rounded-[1.25rem] bg-chalk px-4 py-3 text-right">
          <p className="text-xs font-medium text-ink/42">{t('components.mastery')}</p>
          <strong className="mt-1 block text-lg font-semibold text-ink">
            {resolvedMastery}
          </strong>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_200px]">
        <div className="rounded-[1.35rem] bg-accent-focus p-4">
          <p className="flex items-center gap-2 text-xs font-medium text-ink/50">
            <AbilityMascot ability={reasonAbility} size="tiny" />
            {t('components.mainIssue')}
          </p>
          <p className="mt-2 text-sm font-normal leading-7 text-ink/68">
            {resolvedMainReason}
          </p>
        </div>

        <div className="rounded-[1.35rem] bg-accent-warning p-4">
          <p className="text-xs font-medium text-ink/50">
            {t('components.stuckStep')}
          </p>
          <p className="mt-2 text-lg font-semibold text-ink">{resolvedBrokenStep}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink/45">
          <span>{t('components.repairProgress')}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-chalk">
          <div className="h-2 rounded-full bg-calculation" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.35rem] bg-chalk p-4">
        <div className="text-sm font-normal text-ink/55">
          <span>{t('components.lastPractice')}：{resolvedLastPracticedAt}</span>
          <span className="mx-2 text-ink/25">|</span>
          <span>
            {t('components.practiceTimes', { count: resolvedPracticeCount })}
          </span>
        </div>
        <div className="flex shrink-0 gap-2">
          <SecondaryButton onClick={onViewDetail} to={detailTo}>
            {t('components.detail')}
          </SecondaryButton>
          <SecondaryButton onClick={onRetry} to={onRetry ? undefined : retryTo}>
            {t('components.retry')}
          </SecondaryButton>
          <PrimaryButton
            onClick={onVariantPractice}
            to={onVariantPractice ? undefined : variantTo}
          >
            {t('components.variant')}
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
}
