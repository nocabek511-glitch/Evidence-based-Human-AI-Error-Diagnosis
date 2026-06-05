import { useState } from 'react';
import type { NegotiationFeedbackResultType } from '../data/negotiationFeedback';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Tag from './Tag';

type FeedbackModalCopy = {
  headline: string;
  reason: string;
  nextStep: string;
  primaryLabel: string;
  secondaryLabel: string;
  evidenceDetail: string;
};

const feedbackCopy: Record<NegotiationFeedbackResultType, FeedbackModalCopy> = {
  supported: {
    headline: '你这次补充得很关键，系统会把这题的主要卡点往后调整。',
    reason:
      '你能说明关键关系已经写出来，所以这题不应主要卡在“条件写成式子”这一步。',
    nextStep: '接下来先练后面的计算过程和检查。',
    primaryLabel: '更新这题记录',
    secondaryLabel: '返回原题',
    evidenceDetail:
      '你补充的关系式能说明你已经理解了售价和销量的变化，所以系统会把本题主要卡点调整到后面的计算步骤。',
  },
  partiallySupported: {
    headline: '你抓到了一部分问题，但这一步还没完全稳。',
    reason:
      '你能找到关键条件，但把条件连成完整关系式时还有点不稳定。',
    nextStep: '先练“条件 → 关系式 → 模型”之间的连接。',
    primaryLabel: '练连接步骤',
    secondaryLabel: '返回原题',
    evidenceDetail:
      '你的补充说明你看到了关键条件，但还需要把这个条件稳定地接到完整模型里。',
  },
  notEnoughEvidence: {
    headline: '你的想法可以继续查，但这次证据还不够支持改判。',
    reason:
      '从目前的作答看，你还是容易卡在“文字条件 → 数学关系”这一步。',
    nextStep: '先别急着做完整题，先练 3 个条件转写小任务。',
    primaryLabel: '去练这一块',
    secondaryLabel: '返回修改',
    evidenceDetail:
      '系统还没有看到足够证据说明关系式已经稳定写对，所以这题暂时保留原判断。',
  },
  observing: {
    headline: '这次结果有点摇摆，系统先把你的补充记下来。',
    reason:
      '你有些步骤做对了，但还不足以说明这个判断已经稳定。',
    nextStep: '可以再做一道小验证，或者先回到原题修改。',
    primaryLabel: '再做小验证',
    secondaryLabel: '先回去修改',
    evidenceDetail:
      '这次补充会进入观察记录，后面结合更多错题和练习再更新。',
  },
};

type NegotiationFeedbackModalProps = {
  open: boolean;
  resultType: NegotiationFeedbackResultType;
  onClose: () => void;
  onPrimary: () => void;
  onSecondary: () => void;
};

export default function NegotiationFeedbackModal({
  onClose,
  onPrimary,
  onSecondary,
  open,
  resultType,
}: NegotiationFeedbackModalProps) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const copy = feedbackCopy[resultType];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/18 px-4 backdrop-blur-sm">
      <section className="w-full max-w-[460px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Tag type="info">系统重新看了一遍</Tag>
            <h2 className="mt-4 text-[22px] font-semibold leading-8 tracking-tight text-ink">
              {copy.headline}
            </h2>
          </div>
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-chalk px-4 py-3">
            <p className="text-xs font-medium text-ink/38">为什么这样调整</p>
            <p className="mt-1 text-sm leading-6 text-ink/62">{copy.reason}</p>
          </div>
          <div className="rounded-2xl bg-accent-action px-4 py-3">
            <p className="text-xs font-medium text-ink/38">下一步建议</p>
            <p className="mt-1 text-sm leading-6 text-ink/68">{copy.nextStep}</p>
          </div>
        </div>

        <button
          className="mt-4 text-sm font-medium text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink"
          onClick={() => setEvidenceOpen((value) => !value)}
          type="button"
        >
          {evidenceOpen ? '收起依据' : '查看依据'}
        </button>

        {evidenceOpen ? (
          <div className="mt-3 rounded-2xl border border-ink/8 bg-white px-4 py-3 text-sm leading-6 text-ink/58">
            <p className="text-xs font-medium text-ink/38">系统看到的依据</p>
            <p className="mt-1">{copy.evidenceDetail}</p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <SecondaryButton onClick={onSecondary}>{copy.secondaryLabel}</SecondaryButton>
          <PrimaryButton onClick={onPrimary}>{copy.primaryLabel}</PrimaryButton>
        </div>
      </section>
    </div>
  );
}
