import type { Ability } from '../components/AbilityMascot';

export type AbilityCopy = {
  name: string;
  action: string;
};

export const abilityCopy: Record<Ability, AbilityCopy> = {
  reading: {
    name: '读题理解',
    action: '看清题目在问什么',
  },
  translation: {
    name: '条件转化',
    action: '把题里的话写成数学关系',
  },
  model: {
    name: '建立模型',
    action: '把条件连成式子、图形关系或解题结构',
  },
  method: {
    name: '方法选择',
    action: '判断该用哪种方法开始做',
  },
  calculation: {
    name: '计算执行',
    action: '把过程算稳、算完整',
  },
  review: {
    name: '复核检查',
    action: '做完后回头检查答案和过程',
  },
};

export const coachCopy = {
  diagnosis: {
    systemCertainty: '系统有多确定',
    seeSystemThinking: '看系统怎么判断',
    stuckStep: '你卡在这一步',
    evidenceTitle: '系统这样判断，是因为',
  },
  negotiation: {
    title: '我们重新确认这个判断',
    subtitle:
      '你的质疑会被认真处理，但系统需要一点证据来决定是否更新学习画像。',
    basisTitle: 'AI 当前依据',
    reasonPrompt: '你想从哪个方向补充？',
    reasonPlaceholder:
      '也可以直接说说你的想法，例如：我最近几道同类题已经能先写出关系式了。',
    needsEvidence: '可以，再补一句具体依据。比如：哪一步你已经写对了？',
    continueValidation: '继续验证',
  },
  plan: {
    keepFocusPractice:
      '可以调整。但今天的重点是「条件转化」，建议保留一点练习。',
  },
};
