export type NegotiationFeedbackResultType =
  | 'supported'
  | 'partiallySupported'
  | 'notEnoughEvidence'
  | 'observing';

export type NegotiationFeedback = {
  resultType: NegotiationFeedbackResultType;
  originalDiagnosis: string;
  revisedDiagnosis: string | null;
  secondaryDiagnosis: string | null;
  evidenceSummary: string;
  diagnosisUpdateText: string;
  nextAction: string;
  selfCheckRecord: string;
};

export const negotiationFeedbackByType: Record<
  NegotiationFeedbackResultType,
  NegotiationFeedback
> = {
  supported: {
    resultType: 'supported',
    originalDiagnosis: 'condition_translation',
    revisedDiagnosis: 'procedural_execution',
    secondaryDiagnosis: null,
    evidenceSummary: '学生补充了正确的售价和销量关系。',
    diagnosisUpdateText: '条件转化 → 程序执行',
    nextAction: 'practice_calculation_check',
    selfCheckRecord: 'effective_challenge',
  },
  partiallySupported: {
    resultType: 'partiallySupported',
    originalDiagnosis: 'condition_translation',
    revisedDiagnosis: 'condition_translation',
    secondaryDiagnosis: 'model_construction',
    evidenceSummary: '学生能找出关键条件，但关系式到模型的连接还不完整。',
    diagnosisUpdateText: '条件转化为主，模型建立为辅',
    nextAction: 'practice_connection_steps',
    selfCheckRecord: 'partially_effective_challenge',
  },
  notEnoughEvidence: {
    resultType: 'notEnoughEvidence',
    originalDiagnosis: 'condition_translation',
    revisedDiagnosis: null,
    secondaryDiagnosis: null,
    evidenceSummary: '学生提出了异议，但补充内容还不足以支持新判断。',
    diagnosisUpdateText: '保留原诊断：条件转化',
    nextAction: 'practice_condition_translation',
    selfCheckRecord: 'challenge_needs_more_evidence',
  },
  observing: {
    resultType: 'observing',
    originalDiagnosis: 'condition_translation',
    revisedDiagnosis: null,
    secondaryDiagnosis: null,
    evidenceSummary: '学生补充有一定道理，但单次结果还不够稳定。',
    diagnosisUpdateText: '加入观察记录，暂不修改长期画像',
    nextAction: 'quick_verification_or_revise',
    selfCheckRecord: 'observe_challenge',
  },
};

export const feedbackTypeFromVerificationScore = (
  correctCount: number,
): NegotiationFeedbackResultType => {
  if (correctCount >= 3) return 'supported';
  if (correctCount === 2) return 'partiallySupported';
  if (correctCount <= 1) return 'notEnoughEvidence';
  return 'observing';
};
