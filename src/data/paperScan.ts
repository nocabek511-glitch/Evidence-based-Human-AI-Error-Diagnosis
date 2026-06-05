export type PaperQuestionStatus = 'needs_review' | 'needs_confirm' | 'skipped';

export type PaperQuestion = {
  id: string;
  number: string;
  status: PaperQuestionStatus;
  statusText: string;
  initialDiagnosis: string;
  initialDiagnosisText: string;
  confidence: 'low' | 'medium' | 'high';
  studentWorkExtracted: boolean;
  correctionMarksDetected: boolean;
  reason: string;
  actionLabel: string;
};

export type PaperScan = {
  paperId: string;
  totalQuestions: number;
  detectedWrongQuestions: number;
  questions: PaperQuestion[];
};

export type QuestionReviewStep = {
  title: string;
  content: string;
  highlight?: boolean;
  note?: string;
};

export type QuestionDiagnosis = {
  questionId: string;
  studentInitialGuess: string;
  aiDiagnosis: string;
  confidence: string;
  evidence: string;
  originalQuestion: string;
  referenceSteps: QuestionReviewStep[];
  compareStudentSteps: QuestionReviewStep[];
  studentSteps: string[];
  breakdownStep: {
    label: string;
    highlightedText: string;
  };
  bridgeExplanation: string;
  fullSolutionSteps: string[];
  fullSolutionAvailable: boolean;
};

export type DiagnosisRepair = {
  questionId: string;
  title: string;
  subtitle: string;
  problemPreview: {
    short: string;
    full: string;
  };
  summary: {
    mainIssue: string;
    specificBreak: string;
    studentGuess: string;
    certainty: string;
    confidence?: string;
  };
  repairCard: {
    title: string;
    studentVersion: {
      label: string;
      formula: string;
      fullExpression: string;
    };
    problem: {
      label: string;
      text: string;
      keyDiff: string;
    };
    correctedVersion: {
      label: string;
      formula: string;
      fullExpression: string;
    };
  };
  fullSolution: string[];
  stuckPoint: {
    title: string;
    studentOriginal: {
      title: string;
      content: string;
      note: string;
    };
    problem: {
      title: string;
      content: string;
      wrongFormula: string;
      correctFormula: string;
    };
    repair: {
      title: string;
      content: string;
      formula: string;
    };
  };
};

export const paperScan: PaperScan = {
  paperId: 'paper_001',
  totalQuestions: 28,
  detectedWrongQuestions: 6,
  questions: [
    {
      id: 'q5',
      number: '第 5 题',
      status: 'needs_review',
      statusText: '需要复盘',
      initialDiagnosis: 'condition_translation',
      initialDiagnosisText: '可能卡在条件转化',
      confidence: 'medium',
      studentWorkExtracted: true,
      correctionMarksDetected: true,
      reason: '批改痕迹和解题过程都比较清楚',
      actionLabel: '查看',
    },
    {
      id: 'q8',
      number: '第 8 题',
      status: 'needs_review',
      statusText: '需要复盘',
      initialDiagnosis: 'model_construction',
      initialDiagnosisText: '可能卡在模型建立',
      confidence: 'medium',
      studentWorkExtracted: true,
      correctionMarksDetected: true,
      reason: '中间步骤有跳步',
      actionLabel: '查看',
    },
    {
      id: 'q13',
      number: '第 13 题',
      status: 'needs_confirm',
      statusText: '需要确认',
      initialDiagnosis: 'unclear_marks',
      initialDiagnosisText: '批改痕迹不太清楚',
      confidence: 'low',
      studentWorkExtracted: false,
      correctionMarksDetected: true,
      reason: '有涂改，系统不确定最终答案',
      actionLabel: '确认',
    },
    {
      id: 'q16',
      number: '第 16 题',
      status: 'needs_review',
      statusText: '需要复盘',
      initialDiagnosis: 'method_selection',
      initialDiagnosisText: '可能卡在方法选择',
      confidence: 'medium',
      studentWorkExtracted: true,
      correctionMarksDetected: true,
      reason: '选择了较绕的证明路径',
      actionLabel: '查看',
    },
    {
      id: 'q20',
      number: '第 20 题',
      status: 'skipped',
      statusText: '已跳过',
      initialDiagnosis: 'correct',
      initialDiagnosisText: '系统判断为正确',
      confidence: 'high',
      studentWorkExtracted: true,
      correctionMarksDetected: false,
      reason: '没有明显错号，步骤完整',
      actionLabel: '查看',
    },
    {
      id: 'q24',
      number: '第 24 题',
      status: 'needs_review',
      statusText: '需要复盘',
      initialDiagnosis: 'review_check',
      initialDiagnosisText: '可能少了检查步骤',
      confidence: 'medium',
      studentWorkExtracted: true,
      correctionMarksDetected: true,
      reason: '结果写反，但过程接近正确',
      actionLabel: '查看',
    },
  ],
};

export const questionDiagnosis: QuestionDiagnosis = {
  questionId: 'q8',
  studentInitialGuess: 'model_construction',
  aiDiagnosis: 'condition_translation',
  confidence: '中等',
  evidence:
    '你读懂了题目，但没有先把“售价下降”和“销量增加”的关系写出来。',
  originalQuestion:
    '某文具店销售笔记本，原售价为 10 元/本，进价为 6 元/本，原来每天能卖 10 本。现在准备降价促销，已知售价每降低 1 元，每天销量增加 5 本。请建立总利润 y 与降价 x 之间的函数关系，并求最大利润。',
  referenceSteps: [
    {
      title: '设未知量',
      content: '设每本降低 x 元（x ≥ 0），则新的售价为 10 - x 元。',
    },
    {
      title: '写出销量变化关系',
      content:
        '售价每降低 1 元，销量增加 5 本；所以降价 x 元时，销量增加 5x 本。\n原来每天销量为 10 本，因此新的销量为 10 + 5x 本。',
    },
    {
      title: '建立利润函数',
      content:
        '每本利润 = 新售价 - 进价 = 10 - x - 6 = 4 - x。\n总利润 y = 每本利润 × 销量 = (4 - x)(10 + 5x)。',
    },
    {
      title: '展开并化简',
      content: 'y = 40 + 20x - 10x - 5x²\n所以 y = -5x² + 10x + 40。',
    },
    {
      title: '求最大值',
      content:
        '这是一个开口向下的二次函数，最大值出现在顶点处。\n用 x = -b / 2a 可得 x = 1，此时 y = 45。',
    },
    {
      title: '回到题目检查',
      content:
        'x = 1 表示每本降价 1 元，售价为 9 元，销量为 15 本。\n每本利润为 3 元，总利润为 45 元，符合题目实际范围。',
    },
  ],
  compareStudentSteps: [
    {
      title: '设未知量',
      content: '设降价 x 元，所以新的售价是 10 - x 元。',
    },
    {
      title: '直接写利润表达式',
      content:
        '每本利润 = 10 - x - 6 = 4 - x。\n学生写成：y = (4 - x)(10 + x)，把销量变化写成了 10 + x。',
      highlight: true,
      note:
        '这里少了一个关键对应步骤：题目说“每降低 1 元，销量增加 5 本”，所以销量应先转成 10 + 5x。',
    },
    {
      title: '展开计算',
      content: '继续按 y = (4 - x)(10 + x) 展开：\ny = 40 + 4x - 10x - x² = -x² - 6x + 40。',
    },
    {
      title: '得到答案',
      content:
        '后面根据这个函数继续判断最大利润。因为前面的销量关系写偏了，后面的结果也会跟着偏。',
    },
  ],
  studentSteps: [
    '设售价为 x 元。',
    '把销量写成 10 + x，直接得到 y = (4 - x)(10 + x)。',
    '按这个函数展开并求最大利润。',
  ],
  breakdownStep: {
    label: '条件 → 关系式',
    highlightedText:
      '这里开始卡住：你直接写了利润表达式，但前面少了一步，先把售价变化和销量变化写成关系。',
  },
  bridgeExplanation:
    '题目说“售价每降低 1 元，销量增加 5 本”，所以要先写出两个变化关系：售价 = 10 - x，销量 = 10 + 5x，再把它们放进利润表达式。',
  fullSolutionAvailable: true,
  fullSolutionSteps: [
    '设每本降价 x 元，则新售价为 10 - x 元。',
    '先写变化关系：售价 = 10 - x，销量 = 10 + 5x。',
    '每本利润 = 10 - x - 6 = 4 - x，总利润 y = (4 - x)(10 + 5x)。',
    '展开得到 y = -5x² + 10x + 40。',
    '顶点处 x = 1，最大利润为 45 元，再检查 x 符合实际降价范围。',
  ],
};

export const diagnosisRepair: DiagnosisRepair = {
  questionId: 'q8',
  title: '第 8 题诊断',
  subtitle: '你卡在这里：第 2 步少了销量变化关系',
  problemPreview: {
    short: '售价每降低 1 元，销量增加 5 本。',
    full: '某文具店销售笔记本，原售价为 10 元/本，进价为 6 元/本，原来每天能卖 10 本。现在准备降价促销，已知售价每降低 1 元，每天销量增加 5 本。请建立总利润 y 与降价 x 之间的函数关系，并求最大利润。',
  },
  summary: {
    mainIssue: '把题里的话写成式子',
    specificBreak: '销量变化关系少写了 5 倍',
    studentGuess: '模型没建起来',
    certainty: '中等',
    confidence: '中等',
  },
  repairCard: {
    title: '第 2 步：销量变化关系少写了 5 倍',
    studentVersion: {
      label: '你写成了',
      formula: '销量 = 10 + x',
      fullExpression: 'y = (4 - x)(10 + x)',
    },
    problem: {
      label: '为什么不对',
      text:
        '题目说“售价每降低 1 元，销量增加 5 本”。所以降价 x 元时，不是多 x 本，而是多 5x 本。',
      keyDiff: 'x → 5x',
    },
    correctedVersion: {
      label: '应该写成',
      formula: '销量 = 10 + 5x',
      fullExpression: 'y = (4 - x)(10 + 5x)',
    },
  },
  fullSolution: [
    '设降价 x 元。',
    '售价 = 10 - x。',
    '销量 = 10 + 5x。',
    '利润函数 y = (4 - x)(10 + 5x)。',
    '展开并求最大值。',
    '检查 x 是否符合实际范围。',
  ],
  stuckPoint: {
    title: '你卡在这里：第 2 步少了销量变化关系',
    studentOriginal: {
      title: '你原来这样写',
      content: '你直接写了利润表达式：\ny = (4 - x)(10 + x)',
      note: '这里把销量变化写成了 10 + x。',
    },
    problem: {
      title: '问题在哪里',
      content:
        '题目说“售价每降低 1 元，销量增加 5 本”。如果降价 x 元，销量不是增加 x 本，而是增加 5x 本。\n系统这样判断，是因为你已经设了未知量，也开始写利润式，但在写利润式前少了“销量变化关系”这一步。',
      wrongFormula: '销量 = 10 + x',
      correctFormula: '销量 = 10 + 5x',
    },
    repair: {
      title: '这一步应该先补上',
      content:
        '先把售价和销量分别写清楚，再放进利润表达式。',
      formula: '售价 = 10 - x\n销量 = 10 + 5x\ny = (4 - x)(10 + 5x)',
    },
  },
};
