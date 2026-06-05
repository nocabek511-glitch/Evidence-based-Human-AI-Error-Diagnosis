import { useEffect, useMemo, useState } from 'react';
import type { NegotiationFeedbackResultType } from '../data/negotiationFeedback';
import { useLanguage } from '../i18n/LanguageContext';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

type DrawerStage = 'input' | 'review' | 'supplement';

interface ChallengeConversationDrawerProps {
  open: boolean;
  onClose: () => void;
  currentJudgment?: string;
  onReadyToRejudge?: (resultType: NegotiationFeedbackResultType) => void;
}

type ReviewCopy = {
  resultType: NegotiationFeedbackResultType;
  title: string;
  aiReview: string;
  recordTitle: string;
  mainBreak: string;
  affectedStep?: string;
  acceptLabel: string;
};

const formulaDiff = {
  original: '销量 = 10 + x',
  corrected: '销量 = 10 + 5x',
  expression: 'y = (4 - x)(10 + 5x)',
};

const hasUsefulEvidence = (text: string) => {
  const trimmed = text.trim();
  if (trimmed.length < 10) return false;
  if (/^(我觉得不是|不准|不是这里|不是)$/i.test(trimmed)) return false;

  return /已经|写出|写对|关系式|销量|计算|展开|代入|第[一二三四五六\d]|因为|所以|少写|漏写|5x|算错|步骤/.test(
    trimmed,
  );
};

const getClaimLabel = (selectedDirection: string, message: string) => {
  if (selectedDirection) return selectedDirection;
  if (/计算|算错|展开|代入/.test(message)) return '后面计算出了问题';
  if (/模型|建模/.test(message)) return '模型没建起来';
  if (/方法/.test(message)) return '方法没选对';
  if (/检查|复核/.test(message)) return '做完没有检查';
  if (/题目|看清/.test(message)) return '题目没看清';
  if (/关系|式子|条件|销量/.test(message)) return '条件没写成式子';
  return '我不确定';
};

const getReviewCopy = (
  selectedDirection: string,
  message: string,
  supplement: string,
  currentJudgment: string,
): ReviewCopy => {
  const source = `${selectedDirection} ${message} ${supplement}`;
  const saysCalculation = /计算|算错|展开|代入/.test(source);
  const saysRelationshipRight =
    /已经.*(写出|写对|列出).*(关系|式子|销量)|关系式.*(写对|写出)|销量关系.*(写对|写出)|10\s*\+\s*5x/.test(
      source,
    );
  const saysUncertain = /不确定|不知道|说不清/.test(source);
  const hasSupplement = supplement.trim().length > 0;

  if (saysRelationshipRight && saysCalculation) {
    return {
      resultType: 'supported',
      title: '你的补充支持调整这题记录',
      aiReview:
        '你能指出关系式已经写对，而后面计算是独立出错。这样看，这题更适合把主断点往后调整。',
      recordTitle: '调整后的记录',
      mainBreak: '计算执行',
      acceptLabel: '我接受这个调整',
    };
  }

  if (saysCalculation || hasSupplement) {
    return {
      resultType: 'partiallySupported',
      title: hasSupplement ? '这题可以记为两个环节一起影响' : '你说对了一部分',
      aiReview:
        '后面计算确实受到了影响，但放回你的原步骤看，最早开始偏的位置还是第 2 步的“销量变化关系”。后面的计算更像是被前一步带偏了。',
      recordTitle: '当前建议记录',
      mainBreak: currentJudgment,
      affectedStep: '计算执行',
      acceptLabel: hasSupplement ? '我接受这个记录' : '我接受这个判断',
    };
  }

  if (saysUncertain || !hasUsefulEvidence(message)) {
    return {
      resultType: 'notEnoughEvidence',
      title: '这次信息还不够支持改判',
      aiReview:
        '你提出了不同判断，但目前还看不到哪一步能说明关系式已经写对。可以再补充一句依据，或者先保留原判断。',
      recordTitle: '暂时建议',
      mainBreak: currentJudgment,
      affectedStep: '计算执行',
      acceptLabel: '先保留原判断',
    };
  }

  return {
    resultType: 'observing',
    title: '主断点仍然在这里',
    aiReview:
      '你补充的信息说明你知道销量会变化，但在这道题的实际步骤里，最早写偏的地方仍然是销量关系：把 5x 写成了 x。',
    recordTitle: '当前建议记录',
    mainBreak: currentJudgment,
    affectedStep: '计算执行',
    acceptLabel: '我接受这个判断',
  };
};

export default function ChallengeConversationDrawer({
  currentJudgment = '条件转化',
  onClose,
  onReadyToRejudge,
  open,
}: ChallengeConversationDrawerProps) {
  const { t, tr } = useLanguage();
  const quickOptions = tr<string[]>('challengeDrawer.quickOptions');
  const [stage, setStage] = useState<DrawerStage>('input');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [message, setMessage] = useState('');
  const [supplement, setSupplement] = useState('');
  const [hint, setHint] = useState('');

  useEffect(() => {
    if (!open) return;
    setStage('input');
    setSelectedDirection('');
    setMessage('');
    setSupplement('');
    setHint('');
  }, [open]);

  const claimLabel = useMemo(
    () => getClaimLabel(selectedDirection, message),
    [message, selectedDirection],
  );
  const recordMainBreak = currentJudgment.includes('条件')
    ? '条件转化'
    : currentJudgment;

  const review = useMemo(
    () => getReviewCopy(selectedDirection, message, supplement, recordMainBreak),
    [message, recordMainBreak, selectedDirection, supplement],
  );

  if (!open) return null;

  const submitInitial = () => {
    if (!selectedDirection && !message.trim()) {
      setHint(t('challengeDrawer.needEvidence'));
      return;
    }
    if (message.trim() && !hasUsefulEvidence(message)) {
      setHint(t('challengeDrawer.needEvidence'));
      return;
    }
    setHint('');
    setStage('review');
  };

  const submitSupplement = () => {
    if (!hasUsefulEvidence(supplement)) {
      setHint('再补一句更具体的依据，比如哪一步写对了，或哪里开始算偏了。');
      return;
    }
    setHint('');
    setStage('review');
  };

  const acceptReview = (fallbackType?: NegotiationFeedbackResultType) => {
    onReadyToRejudge?.(fallbackType || review.resultType);
    onClose();
  };

  const keepOriginal = () => acceptReview('observing');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/18 backdrop-blur-sm">
      <aside className="flex h-full w-full max-w-[600px] flex-col border-l border-ink/10 bg-white shadow-[0_22px_60px_rgba(47,52,59,0.18)] sm:min-w-[520px]">
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
          {stage === 'input' ? (
            <>
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                {t('challengeDrawer.aiIntro')}
              </div>

              <section>
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
                      onClick={() => {
                        setSelectedDirection(option);
                        setHint('');
                      }}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-medium text-ink/42">
                  {t('challengeDrawer.evidenceLabel')}
                </p>
                <textarea
                  className="min-h-32 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setHint('');
                  }}
                  placeholder={t('challengeDrawer.inputPlaceholder')}
                  value={message}
                />
                {hint ? (
                  <div className="mt-3 rounded-[1.25rem] border border-model/25 bg-accent-warning/70 px-4 py-3 text-sm leading-6 text-ink/62">
                    {hint}
                  </div>
                ) : null}
              </section>
            </>
          ) : null}

          {stage === 'review' ? (
            <section className="space-y-4">
              <div className="rounded-[1.5rem] border border-translation/15 bg-white p-4 shadow-[0_8px_24px_rgba(47,52,59,0.035)]">
                <p className="text-xs font-medium text-ink/38">
                  你提出的判断
                </p>
                <p className="mt-2 text-sm leading-7 text-ink/66">
                  你认为：真正问题在
                  <span className="font-semibold text-ink"> {claimLabel} </span>
                  ，不是
                  <span className="font-semibold text-ink"> {currentJudgment}</span>。
                </p>
                {message.trim() ? (
                  <p className="mt-3 rounded-2xl bg-chalk px-4 py-3 text-sm leading-6 text-ink/56">
                    {message.trim()}
                  </p>
                ) : null}
                {supplement.trim() ? (
                  <p className="mt-2 rounded-2xl bg-accent-warning/60 px-4 py-3 text-sm leading-6 text-ink/60">
                    补充：{supplement.trim()}
                  </p>
                ) : null}
              </div>

              <div className="rounded-[1.5rem] border border-ink/8 bg-chalk/75 p-4">
                <p className="text-sm font-semibold text-ink">
                  我们放回步骤里看一下
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/62">
                  {review.aiReview}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-[1.35rem] border border-translation/20 bg-accent-focus px-4 py-3">
                  <p className="text-xs font-medium text-ink/38">你写成了</p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {formulaDiff.original}
                  </p>
                </div>
                <div className="hidden items-center justify-center text-ink/28 sm:flex">
                  →
                </div>
                <div className="rounded-[1.35rem] border border-calculation/20 bg-accent-action px-4 py-3">
                  <p className="text-xs font-medium text-ink/38">应该先写成</p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {formulaDiff.corrected}
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-calculation/20 bg-white p-4">
                <p className="text-xs font-medium text-ink/38">
                  {review.recordTitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent-focus px-3 py-1.5 text-xs font-medium text-ink/62">
                    主断点：{review.mainBreak}
                  </span>
                  {review.affectedStep ? (
                    <span className="rounded-full bg-accent-warning px-3 py-1.5 text-xs font-medium text-ink/62">
                      受影响步骤：{review.affectedStep}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/54">
                  后面计算不是完全独立出错，而是沿着前面关系式继续算。
                </p>
              </div>
            </section>
          ) : null}

          {stage === 'supplement' ? (
            <section className="space-y-4">
              <div className="max-w-[92%] rounded-[1.25rem] rounded-tl-sm bg-accent-focus px-4 py-3 text-sm leading-7 text-ink/68">
                可以。你可以指出 AI 漏看的步骤，或者说明为什么你认为主断点不在这里。
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-ink">
                  继续补充你的想法
                </p>
                <textarea
                  className="min-h-36 w-full resize-none rounded-[1.25rem] border border-ink/10 bg-chalk px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-calculation focus:bg-white focus:ring-4 focus:ring-calculation/15"
                  onChange={(event) => {
                    setSupplement(event.target.value);
                    setHint('');
                  }}
                  placeholder="例如：我觉得第 2 步虽然写错了，但我是先知道销量会变化的，只是写公式时少写了 5。"
                  value={supplement}
                />
                {hint ? (
                  <div className="mt-3 rounded-[1.25rem] border border-model/25 bg-accent-warning/70 px-4 py-3 text-sm leading-6 text-ink/62">
                    {hint}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>

        <div className="border-t border-ink/8 px-5 py-4">
          {stage === 'input' ? (
            <div className="flex flex-wrap justify-end gap-3">
              <SecondaryButton onClick={onClose}>
                {t('challengeDrawer.back')}
              </SecondaryButton>
              <PrimaryButton onClick={submitInitial}>
                {t('challengeDrawer.submit')}
              </PrimaryButton>
            </div>
          ) : null}

          {stage === 'review' ? (
            <div className="flex flex-wrap justify-end gap-3">
              <button
                className="rounded-full px-4 py-2 text-sm font-medium text-ink/45 transition hover:bg-chalk hover:text-ink"
                onClick={keepOriginal}
                type="button"
              >
                先保留原判断
              </button>
              <SecondaryButton onClick={() => setStage('supplement')}>
                我还想补充
              </SecondaryButton>
              {review.resultType === 'notEnoughEvidence' ? null : (
                <PrimaryButton onClick={() => acceptReview()}>
                  {review.acceptLabel}
                </PrimaryButton>
              )}
            </div>
          ) : null}

          {stage === 'supplement' ? (
            <div className="flex flex-wrap justify-end gap-3">
              <SecondaryButton
                onClick={() => {
                  setHint('');
                  setStage('review');
                }}
              >
                返回上一步
              </SecondaryButton>
              <PrimaryButton onClick={submitSupplement}>再看一遍</PrimaryButton>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
