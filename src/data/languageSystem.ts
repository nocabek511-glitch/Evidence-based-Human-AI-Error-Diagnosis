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
    title: '你觉得哪里不合理？',
    subtitle:
      '直接说你的想法就行。比如分数偏低，或者系统漏看了你最近的表现。',
    basisTitle: '系统依据',
    ideaLabel: '你的想法',
    ideaPlaceholder:
      '比如：我最近几道同类题已经能先写出关系式了，所以我觉得“条件转化”不该这么低。',
    needsEvidence:
      '可以，再补一句具体依据。比如哪道题、哪一步，或者最近哪次练习表现。',
    continueValidation: '继续验证',
  },
  plan: {
    keepFocusPractice:
      '可以调整。但今天的重点是「条件转化」，建议保留一点练习。',
  },
};
