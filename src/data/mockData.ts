import type { TagType } from '../components/Tag';

export type AbilityDimension = {
  name: string;
  score: number;
  color: string;
  level: string;
};

export type DashboardStat = {
  title: string;
  value: string;
  description: string;
  trend: string;
  trendType: TagType;
  icon: string;
};

export type Mistake = {
  id: number;
  subject: string;
  title: string;
  source: string;
  reason: string;
  tags: string[];
  mastery: number;
  nextAction: string;
  badge: string;
};

export type PracticeQuestion = {
  id: number;
  title: string;
  difficulty: string;
  focus: string;
  status: '已点亮' | '待挑战' | '建议再练';
  reward: string;
};

export const workflowSteps = [
  { label: '开启诊断', description: '上传或录入错题' },
  { label: '拆解卡点', description: '找到真正拐弯处' },
  { label: '修复技能', description: '加入技能修复库' },
  { label: '闯关练习', description: '做 3 道变式题' },
  { label: '刷新地图', description: '更新六维成长值' },
  { label: '领取计划', description: '生成三日任务' },
];

export const dashboardStats: DashboardStat[] = [
  {
    title: '今天完成任务',
    value: '2/5',
    description: '先修一个短板，别开全图战争。',
    trend: '+2',
    trendType: 'success',
    icon: '✅',
  },
  {
    title: '本周点亮技能',
    value: '7',
    description: '函数参数意识正在变稳。',
    trend: '+3',
    trendType: 'success',
    icon: '⭐',
  },
  {
    title: '待挑战关卡',
    value: '9',
    description: '建议从中档迁移开始。',
    trend: '待练',
    trendType: 'warning',
    icon: '🎯',
  },
  {
    title: '连续学习',
    value: '6 天',
    description: '节奏在线，不需要猛冲。',
    trend: '连续',
    trendType: 'info',
    icon: '🔥',
  },
];

export const abilityDimensions: AbilityDimension[] = [
  { name: '概念理解', score: 82, color: '#F5B1B2', level: '稳' },
  { name: '计算准确', score: 68, color: '#E2CDF7', level: '待修' },
  { name: '审题提取', score: 74, color: '#FFD997', level: '可进阶' },
  { name: '方法迁移', score: 61, color: '#C8E3A5', level: '主线任务' },
  { name: '表达规范', score: 79, color: '#9BD1C5', level: '稳中升' },
  { name: '复盘坚持', score: 88, color: '#ABC5EF', level: '已点亮' },
];

export const latestDiagnosis = {
  subject: '数学',
  chapter: '二次函数与一元二次方程',
  coachLine: '这题不是你不会，而是第二步拐弯太急。我们先把它拆开。',
  question:
    '已知抛物线 y = ax² + bx + c 经过 A(-1,0)、B(3,0)，且顶点纵坐标为 -4，求解析式并判断与直线 y = x + 1 的交点个数。',
  wrongAnswer:
    '将两个零点直接代入后得到 y = (x+1)(x-3)，没有利用顶点纵坐标校准系数 a。',
  diagnosis: [
    {
      title: '卡点 1：少看了一个隐藏旋钮',
      content: '两个零点只能确定形状的位置，还不能确定开口被拉大还是压扁，参数 a 还在等你处理。',
    },
    {
      title: '卡点 2：条件转化还没站稳',
      content: '顶点纵坐标是用来锁定 a 的关键线索，先别急着展开式子。',
    },
    {
      title: '下一步：先搭架子再计算',
      content: '写成 y = a(x+1)(x-3)，再把顶点横坐标代回去。这样每一步都能对上题目条件。',
    },
  ],
  recommendedTags: ['零点式', '顶点坐标', '参数意识', '函数图像'],
};

export const mistakes: Mistake[] = [
  {
    id: 1,
    subject: '数学',
    title: '二次函数零点式系数遗漏',
    source: '八年级下册阶段测',
    reason: '不是公式没记住，而是把 a 这个“隐藏旋钮”跳过去了。',
    tags: ['二次函数', '参数意识', '图像性质'],
    mastery: 64,
    nextAction: '完成 3 道含顶点条件的变式题',
    badge: '主线修复',
  },
  {
    id: 2,
    subject: '物理',
    title: '浮力受力分析漏画重力',
    source: '期中复盘卷',
    reason: '先别冲公式，受力图还少一块拼图。',
    tags: ['浮力', '受力分析', '公式选择'],
    mastery: 72,
    nextAction: '先做 2 道画图题再计算',
    badge: '图像补丁',
  },
  {
    id: 3,
    subject: '英语',
    title: '定语从句关系代词误选',
    source: '语法专项训练',
    reason: '先行词不难，真正要看的是它在从句里做什么工作。',
    tags: ['定语从句', '句子成分', '语法判断'],
    mastery: 81,
    nextAction: '朗读并拆解 5 个长句',
    badge: '语法徽章',
  },
];

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    title: '关卡 1：两个零点还差什么？',
    difficulty: '基础热身',
    focus: '零点式结构',
    status: '已点亮',
    reward: '+12 XP',
  },
  {
    id: 2,
    title: '关卡 2：用最小值找到参数 a',
    difficulty: '主线挑战',
    focus: '参数 a 的含义',
    status: '待挑战',
    reward: '+18 XP',
  },
  {
    id: 3,
    title: '关卡 3：抛物线遇到直线',
    difficulty: '迁移训练',
    focus: '方程与图像结合',
    status: '建议再练',
    reward: '+24 XP',
  },
];

export const learningPlan = [
  {
    day: '第 1 天',
    theme: '先把架子搭稳',
    tasks: ['复习零点式与顶点式互化', '订正 1 道典型错题', '完成 2 道基础变式'],
    minutes: 35,
    reward: '点亮「参数意识」徽章',
  },
  {
    day: '第 2 天',
    theme: '练条件转化',
    tasks: ['完成 3 道含隐藏参数的题', '记录每题未知量数量', '复盘错因标签'],
    minutes: 45,
    reward: '获得「稳住第二步」星星',
  },
  {
    day: '第 3 天',
    theme: '小测验收',
    tasks: ['完成 1 套小测', '更新六维成长地图', '生成下一轮练习建议'],
    minutes: 40,
    reward: '解锁下一轮学习路线',
  },
];
