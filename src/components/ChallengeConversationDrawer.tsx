import { useEffect, useMemo, useState } from 'react';
import type { NegotiationFeedbackResultType } from '../data/negotiationFeedback';
import { useLanguage } from '../i18n/LanguageContext';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

type DrawerStage = 'chooseOrType' | 'clarifyEvidence' | 'readyToRejudge';

interface ChallengeConversationDrawerProps {
  open: boolean;
  onClose: () => void;
  currentJudgment?: string;
  onReadyToRejudge?: (resultType: NegotiationFeedbackResultType) => void;
  onStartVerification?: () => void;
}

const inferIssue = (
  text: string,
  selectedDirection: string,
  labels: {
    translation: string;
    model: string;
    method: string;
    calculation: string;
    review: string;
    unknown: string;
  },
) => {
  if (selectedDirection) return selectedDirection;

  if (/算错|计算|calculation|calculate|computed/i.test(text)) {
    return labels.calculation;
  }
  if (/模型|建模|model/i.test(text)) return labels.model;
  if (/方法|选对|method|strategy/i.test(text)) return labels.method;
  if (/检查|复核|没检查|check|review/i.test(text)) return labels.review;
  if (/关系式|式子|条件|equation|relationship|condition/i.test(text)) {
    return labels.translation;
  }

  return labels.unknown;
};

const hasEvidence = (text: string, proof: string, isEnglish: boolean) => {
  if (proof) return true;

  const trimmed = text.trim();
  if (trimmed.length < 8) return false;

  const zhEvidence =
    /已经.*(写出|列出|写对).*(关系式|式子)|关系式.*(写对|写出来|列出来)|只是.*(算错|计算)|第[一二三四五六\d].*(步|行)|因为|所以|证据|圈出|补充|重新写/.test(
      trimmed,
    );
  const enEvidence =
    /(already|did|wrote|shown|because|evidence|proof|step|line).*(equation|relationship|calculation|method)|calculated wrong|calculation mistake|i wrote/i.test(
      trimmed,
    );

  return isEnglish ? enEvidence : zhEvidence;
};

const inferFeedbackResultType = (
  text: string,
  selectedDirection: string,
  proof: string,
): NegotiationFeedbackResultType => {
  const source = `${text} ${selectedDirection} ${proof}`.toLowerCase();

  if (/算错|计算|calculation|calculated wrong|calculation error/.test(source)) {
    return 'supported';
  }

  if (/模型|方法|建模|model|method|strategy/.test(source)) {
    return 'partiallySupported';
  }

  if (/不确定|待观察|小验证|not sure|quick check|verification/.test(source)) {
    return 'observing';
  }

  if (/已经.*(写出|列出|写对)|关系式.*(写对|写出来)|already|wrote|did write/.test(source)) {
    return 'partiallySupported';
  }

  return 'observing';
};

export default function ChallengeConversationDrawer({
  currentJudgment,
  onClose,
  onReadyToRejudge,
  onStartVerification,
  open,
}: ChallengeConversationDrawerProps) {
  const { isEnglish, t, tr } = useLanguage();
  const quickOptions = tr<string[]>('challengeDrawer.quickOptions');
  const proofOptions = tr<string[]>('challengeDrawer.proofOptions');
  const issueLabels = tr<{
    translation: string;
    model: string;
    method: string;
    calculation: string;
    review: string;
    unknown: string;
  }>('challengeDrawer.issueLabels');
  const [stage, setStage] = useState<DrawerStage>('chooseOrType');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [message, setMessage] = useState('');
  const [proof, setProof] = useState('');

  useEffect(() => {
    if (!open) return;
    setStage('chooseOrType');
    setSelectedDirection('');
    setMessage('');
    setProof('');
  }, [open]);

  const issue = useMemo(
    () => inferIssue(message, selectedDirection, issueLabels),
    [issueLabels, message, selectedDirection],
  );

  const evidenceReady = hasEvidence(message, proof, isEnglish);
  const feedbackResultType = inferFeedbackResultType(
    message,
    selectedDirection,
    proof,
  );

  if (!open) return null;

  const sendMessage = () => {
    if (evidenceReady) {
      setStage('readyToRejudge');
      return;
    }
    setStage('clarifyEvidence');
  };

  const submitReady = () => {
    onReadyToRejudge?.(feedbackResultType);
    onClose();
  };

  const startVerification = () => {
    onStartVerification?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/18 backdrop-blur-sm">
      <aside className="flex h-full w-full max-w-[460px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-5 py-5">
          <div>
            <Tag type="info">{t('challengeDrawer.tag')}</Tag>
            <h2 className="mt-3 text-xl font-semibold text-ink">
              {t('challengeDrawer.title')}
            </h2>
          </div>
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
            onClick={onClose}
            type="button"
          >
            {t('common.close')}
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
            {t('challengeDrawer.aiIntro')}
          </div>

          {message.trim() || selectedDirection ? (
            <div className="ml-auto max-w-[92%] rounded-[1.25rem] rounded-tr-sm border border-ink/8 bg-white px-4 py-3 text-sm leading-7 text-ink/62 shadow-[0_8px_20px_rgba(47,52,59,0.05)]">
              {message.trim() || selectedDirection}
            </div>
          ) : null}

          {stage === 'chooseOrType' ? (
            <div>
              <p className="mb-2 text-xs font-medium text-ink/42">
                {t('challengeDrawer.quickLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickOptions.map((option) => (
                  <button
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                      selectedDirection === option
                        ? 'border-calculation/40 bg-accent-action text-ink'
                        : 'border-ink/10 bg-white text-ink/55 hover:bg-chalk'
                    }`}
                    key={option}
                    onClick={() => setSelectedDirection(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {stage === 'clarifyEvidence' ? (
            <>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                {t('challengeDrawer.understood', {
                  current:
                    currentJudgment || t('challengeDrawer.defaultCurrentJudgment'),
                  issue,
                })}
              </div>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-warning px-4 py-3 text-sm leading-7 text-ink/68">
                {t('challengeDrawer.needEvidence')}
              </div>
            </>
          ) : null}

          {stage === 'readyToRejudge' ? (
            <div className="space-y-3">
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                {t('challengeDrawer.understood', {
                  current:
                    currentJudgment || t('challengeDrawer.defaultCurrentJudgment'),
                  issue,
                })}
              </div>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-action px-4 py-3 text-sm leading-7 text-ink/68">
                {t('challengeDrawer.evidenceReady')}
              </div>
            </div>
          ) : null}

          {stage !== 'readyToRejudge' ? (
            <textarea
              className="min-h-32 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t('challengeDrawer.inputPlaceholder')}
              value={message}
            />
          ) : null}

          {stage === 'clarifyEvidence' ? (
            <div>
              <p className="mb-2 text-xs font-medium text-ink/42">
                {t('challengeDrawer.proofLabel')}
              </p>
              <div className="grid gap-2">
                {proofOptions.map((option) => (
                  <button
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      proof === option
                        ? 'border-calculation/40 bg-accent-action text-ink'
                        : 'border-ink/10 bg-white text-ink/55 hover:bg-chalk'
                    }`}
                    key={option}
                    onClick={() => setProof(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          {stage === 'readyToRejudge' ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <SecondaryButton onClick={onClose}>
                {t('challengeDrawer.back')}
              </SecondaryButton>
              <PrimaryButton onClick={submitReady}>
                {t('challengeDrawer.submit')}
              </PrimaryButton>
            </div>
          ) : (
            <div className="flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={onClose}>
                {t('challengeDrawer.back')}
              </SecondaryButton>
              <PrimaryButton
                disabled={!message.trim() && !selectedDirection && !proof}
                onClick={sendMessage}
              >
                {stage === 'clarifyEvidence'
                  ? t('challengeDrawer.submit')
                  : t('challengeDrawer.send')}
              </PrimaryButton>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
