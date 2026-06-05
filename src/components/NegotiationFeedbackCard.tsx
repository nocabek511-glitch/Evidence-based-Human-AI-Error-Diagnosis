import type { NegotiationFeedbackResultType } from '../data/negotiationFeedback';
import { useLanguage } from '../i18n/LanguageContext';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

type FeedbackCopy = {
  title: string;
  evidence: string;
  update: string;
  next: string;
  record: string;
  buttons: string[];
};

type NegotiationFeedbackCardProps = {
  resultType: NegotiationFeedbackResultType;
  onUpdateRecord?: () => void;
  onPractice?: () => void;
  onReturn?: () => void;
  onViewEvidence?: () => void;
  onRetry?: () => void;
  onObserve?: () => void;
};

const toneByResult: Record<NegotiationFeedbackResultType, string> = {
  supported: 'border-calculation/30 ring-calculation/10',
  partiallySupported: 'border-translation/25 ring-translation/10',
  notEnoughEvidence: 'border-modeling/30 ring-modeling/10',
  observing: 'border-review/30 ring-review/10',
};

export default function NegotiationFeedbackCard({
  onObserve,
  onPractice,
  onRetry,
  onReturn,
  onUpdateRecord,
  onViewEvidence,
  resultType,
}: NegotiationFeedbackCardProps) {
  const { t, tr } = useLanguage();
  const copy = tr<FeedbackCopy>(`negotiationFeedback.results.${resultType}`);

  const renderActions = () => {
    if (resultType === 'supported') {
      return (
        <>
          <PrimaryButton onClick={onUpdateRecord}>{copy.buttons[0]}</PrimaryButton>
          <SecondaryButton onClick={onPractice} to={onPractice ? undefined : '/practice'}>
            {copy.buttons[1]}
          </SecondaryButton>
          <SecondaryButton onClick={onReturn}>{copy.buttons[2]}</SecondaryButton>
        </>
      );
    }

    if (resultType === 'partiallySupported') {
      return (
        <>
          <PrimaryButton onClick={onPractice} to={onPractice ? undefined : '/practice'}>
            {copy.buttons[0]}
          </PrimaryButton>
          <SecondaryButton onClick={onRetry}>{copy.buttons[1]}</SecondaryButton>
          <SecondaryButton onClick={onViewEvidence}>{copy.buttons[2]}</SecondaryButton>
        </>
      );
    }

    if (resultType === 'notEnoughEvidence') {
      return (
        <>
          <PrimaryButton onClick={onPractice} to={onPractice ? undefined : '/practice'}>
            {copy.buttons[0]}
          </PrimaryButton>
          <SecondaryButton onClick={onViewEvidence}>{copy.buttons[1]}</SecondaryButton>
          <SecondaryButton onClick={onRetry}>{copy.buttons[2]}</SecondaryButton>
        </>
      );
    }

    return (
      <>
        <PrimaryButton onClick={onRetry}>{copy.buttons[0]}</PrimaryButton>
        <SecondaryButton onClick={onReturn}>{copy.buttons[1]}</SecondaryButton>
        <SecondaryButton onClick={onObserve}>{copy.buttons[2]}</SecondaryButton>
      </>
    );
  };

  return (
    <section
      className={`mx-auto max-w-[760px] rounded-[2rem] border bg-white p-6 shadow-card ring-4 ${toneByResult[resultType]}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tag type={resultType === 'notEnoughEvidence' ? 'warning' : 'info'}>
          {t('negotiationFeedback.tag')}
        </Tag>
      </div>

      <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-ink">
        {copy.title}
      </h1>

      <div className="mt-5 grid gap-3">
        <div className="rounded-[1.35rem] bg-chalk px-4 py-3">
          <p className="text-xs font-medium text-ink/42">
            {t('negotiationFeedback.evidenceLabel')}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink/62">{copy.evidence}</p>
        </div>
        <div className="rounded-[1.35rem] bg-accent-focus px-4 py-3">
          <p className="text-xs font-medium text-ink/42">
            {t('negotiationFeedback.updateLabel')}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink/68">{copy.update}</p>
        </div>
        <div className="rounded-[1.35rem] bg-accent-action px-4 py-3">
          <p className="text-xs font-medium text-ink/42">
            {t('negotiationFeedback.nextLabel')}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink/68">{copy.next}</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-6 text-ink/42">{copy.record}</p>

      <div className="mt-5 flex flex-wrap gap-3">{renderActions()}</div>
    </section>
  );
}
