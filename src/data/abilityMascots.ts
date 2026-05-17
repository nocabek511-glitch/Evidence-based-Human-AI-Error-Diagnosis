export type Ability =
  | 'reading'
  | 'translation'
  | 'model'
  | 'method'
  | 'calculation'
  | 'review';

export type AbilityMascotMeta = {
  label: string;
  image: string;
  color: string;
  lightColor: string;
};

export const abilityMascots: Record<Ability, AbilityMascotMeta> = {
  reading: {
    label: '读题理解',
    image: '/assets/mascots/reading-comprehension.png',
    color: '#F5B1B2',
    lightColor: '#FFE5E5',
  },
  translation: {
    label: '条件转化',
    image: '/assets/mascots/condition-translation.png',
    color: '#E2CDF7',
    lightColor: '#F4E9FF',
  },
  model: {
    label: '建立模型',
    image: '/assets/mascots/model-building.png',
    color: '#FFD997',
    lightColor: '#FFF1CB',
  },
  method: {
    label: '方法选择',
    image: '/assets/mascots/method-selection.png',
    color: '#C8E3A5',
    lightColor: '#F1FFDE',
  },
  calculation: {
    label: '计算执行',
    image: '/assets/mascots/calculation-execution.png',
    color: '#9BD1C5',
    lightColor: '#E0FCF6',
  },
  review: {
    label: '复核检查',
    image: '/assets/mascots/review-check.png',
    color: '#ABC5EF',
    lightColor: '#E1E8FF',
  },
};
