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
  secondaryLabel?: string;
  evidenceDetail: string;
};

const feedbackCopy: Record<NegotiationFeedbackResultType, FeedbackModalCopy> = {
  supported: {
    headline: '这题记录好了',
    reason:
      '这题会改为：主断点：计算执行。',
    nextStep: '系统会把后续练习调整到计算过程和结果检查。',
    primaryLabel: '更新本题诊断',
    secondaryLabel: '返回题目',
    evidenceDetail:
      '学生补充能说明关系式已经写对，后续计算更像独立出错，因此本题记录调整到计算执行。',
  },
  partiallySupported: {
    headline: '这题记录好了',
    reason:
      '这题会记为：主断点：条件转化；受影响步骤：计算执行。',
    nextStep: '你提出的“后面计算也受影响”会一起记录进去。',
    primaryLabel: '更新记录',
    secondaryLabel: '返回题目',
    evidenceDetail:
      '后面计算确实受到影响，但最早开始偏的位置仍然是销量变化关系。',
  },
  notEnoughEvidence: {
    headline: '这题先这样记录',
    reason:
      '这次信息还不够支持改判。',
    nextStep: '你可以回到题目继续补充，也可以先保留原判断。',
    primaryLabel: '回到题目',
    secondaryLabel: '返回题目',
    evidenceDetail:
      '目前还看不到哪一步能说明关系式已经写对，所以暂时不调整本题主要卡点。',
  },
  observing: {
    headline: '这题记录好了',
    reason:
      '这题先保留原判断。',
    nextStep:
      '你的补充会被记入记录，后面如果同类题继续出现，系统会再更新。',
    primaryLabel: '回到题目',
    evidenceDetail:
      '本题仍先记为：主断点：条件转化；受影响步骤：计算执行。',
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
            <Tag type="info">记录完成</Tag>
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
            <p className="text-xs font-medium text-ink/38">本题记录</p>
            <p className="mt-1 text-sm leading-6 text-ink/62">{copy.reason}</p>
          </div>
          <div className="rounded-2xl bg-accent-action px-4 py-3">
            <p className="text-xs font-medium text-ink/38">接下来</p>
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
          {copy.secondaryLabel ? (
            <SecondaryButton onClick={onSecondary}>
              {copy.secondaryLabel}
            </SecondaryButton>
          ) : null}
          <PrimaryButton onClick={onPrimary}>{copy.primaryLabel}</PrimaryButton>
        </div>
      </section>
    </div>
  );
}
