import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

type UploadStep = 1 | 2 | 3 | 4 | 5;
type StandardAnswerMode = 'has-answer' | 'no-answer' | 'teacher-explain';

const steps: Array<{
  id: UploadStep;
  title: string;
  hint: string;
}> = [
  { id: 1, title: '上传题目', hint: '先告诉我题目是什么。' },
  { id: 2, title: '上传解答', hint: '再告诉我你是怎么做的。' },
  { id: 3, title: '标准答案', hint: '有标准答案就放进来，没有也可以继续。' },
  { id: 4, title: '确认内容', hint: '先确认我有没有认错字。' },
  { id: 5, title: '开始诊断', hint: '确认后，我再分析你卡在哪一步。' },
];

const mockQuestion =
  '某商店销售一种商品，已知售价与销量之间满足一次函数关系。售价为 20 元时销量为 100 件，售价每增加 2 元，销量减少 10 件。请建立函数表达式，并求最大利润。';

const mockStudentSteps = [
  '设销售单价为 x。',
  '直接把售价代入利润计算，得到一个结果。',
  '最终答案：最大利润为 2400 元。',
];

const mockStandardSteps = [
  '设销售单价为 x，销量为 y。',
  '根据“售价每增加 2 元，销量减少 10 件”建立一次函数关系。',
  '代入已知点求出 y 关于 x 的表达式。',
  '建立利润函数并求最大值。',
];

function WizardProgress({
  currentStep,
  isStepComplete,
}: {
  currentStep: UploadStep;
  isStepComplete: (step: UploadStep) => boolean;
}) {
  return (
    <section className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-card">
      <div className="grid grid-cols-5 gap-3">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isDone = step.id < currentStep || isStepComplete(step.id);

          return (
            <div className="relative" key={step.id}>
              {index !== 0 ? (
                <span
                  className={`absolute -left-1/2 top-5 h-1 w-full rounded-full ${
                    step.id <= currentStep ? 'bg-calculation/45' : 'bg-chalk'
                  }`}
                />
              ) : null}
              <div className="relative flex flex-col items-center text-center">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-medium transition ${
                    isActive
                      ? 'border-calculation/40 bg-accent-action text-ink shadow-[0_8px_20px_rgba(155,209,197,0.22)]'
                      : isDone
                        ? 'border-calculation/35 bg-white text-ink'
                        : 'border-ink/10 bg-chalk text-ink/38'
                  }`}
                >
                  {isDone && !isActive ? '✓' : step.id}
                </span>
                <p
                  className={`mt-3 text-sm font-medium ${
                    isActive ? 'text-ink' : 'text-ink/50'
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-1 hidden text-xs font-normal leading-5 text-ink/42 xl:block">
                  {step.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StepShell({
  children,
  eyebrow,
  title,
  description,
  accentClass,
  side,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  accentClass: string;
  side: ReactNode;
}) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)_300px] gap-6 rounded-[32px] border border-ink/10 bg-white p-6 shadow-card">
      <div className="min-w-0">
        <Tag type="neutral">{eyebrow}</Tag>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] font-normal leading-7 text-ink/62">
          {description}
        </p>
        <div className={`mt-6 rounded-[28px] border border-ink/8 p-5 ${accentClass}`}>
          {children}
        </div>
      </div>
      <aside className="flex flex-col justify-between rounded-[28px] border border-ink/8 bg-white p-5">
        {side}
      </aside>
    </section>
  );
}

function UploadActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-[0_4px_14px_rgba(47,52,59,0.035)] transition hover:-translate-y-0.5 hover:bg-chalk"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white px-4 py-3">
      <span className="text-sm font-normal text-ink/50">{label}</span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  );
}

export default function UploadPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<UploadStep>(1);
  const [hasQuestionImage, setHasQuestionImage] = useState(false);
  const [hasStudentSolution, setHasStudentSolution] = useState(false);
  const [standardAnswerMode, setStandardAnswerMode] =
    useState<StandardAnswerMode>('has-answer');
  const [hasStandardAnswer, setHasStandardAnswer] = useState(false);
  const [hasConfirmedRecognition, setHasConfirmedRecognition] = useState(false);
  const [notice, setNotice] = useState('');

  const isStepComplete = (step: UploadStep) => {
    if (step === 1) return hasQuestionImage;
    if (step === 2) return hasStudentSolution;
    if (step === 3) {
      return standardAnswerMode !== 'has-answer' || hasStandardAnswer;
    }
    if (step === 4) return hasConfirmedRecognition;
    return true;
  };

  const nextLabel =
    currentStep === 5
      ? '开始 AI 诊断'
      : currentStep === 4
        ? '确认无误，进入准备'
        : currentStep === 1
          ? '下一步：上传解答'
          : currentStep === 2
            ? '下一步：标准答案'
            : '下一步：确认识别结果';

  const handleNext = () => {
    if (currentStep === 5) {
      navigate('/diagnosis');
      return;
    }

    if (!isStepComplete(currentStep)) {
      const tips: Record<UploadStep, string> = {
        1: '先放入题目，再进入下一步。',
        2: '先上传或输入你的解题过程。',
        3: '如果选择“我有标准答案”，请先补充内容；没有标准答案可以切换选项继续。',
        4: '请先确认识别内容无误。',
        5: '',
      };
      setNotice(tips[currentStep]);
      return;
    }

    setNotice('');
    setCurrentStep((step) => Math.min(step + 1, 5) as UploadStep);
  };

  const handleBack = () => {
    setNotice('');
    setCurrentStep((step) => Math.max(step - 1, 1) as UploadStep);
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <StepShell
          accentClass="bg-accent-action"
          description="请上传你想诊断的那一道题，题干和配图尽量拍完整。先别急着放答案，我们一步一步来。"
          eyebrow="Step 1"
          side={
            <>
              <div>
                <AbilityMascot ability="reading" size="card" />
                <p className="mt-4 text-base font-semibold text-ink">
                  先告诉我题目是什么。
                </p>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/58">
                  建议只上传一道题。整张试卷可以先手动框选题目区域。
                </p>
              </div>
              {hasQuestionImage ? (
                <div className="mt-6 space-y-2">
                  <InfoLine label="状态" value="图片已上传" />
                  <InfoLine label="识别" value="数学题 + 配图" />
                </div>
              ) : null}
            </>
          }
          title="先上传题目"
        >
          <div className="grid min-h-[280px] place-items-center rounded-[28px] border-2 border-dashed border-calculation/45 bg-white/72 p-8 text-center">
            <div>
              <AbilityMascot ability="reading" className="mx-auto" size="inline" />
              <p className="mt-4 text-lg font-medium text-ink">
                把题目图片拖到这里，或点击上传
              </p>
              <p className="mt-2 text-sm font-normal text-ink/50">
                当前是 mock 流程，点击任意上传方式即可模拟完成。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <UploadActionButton onClick={() => setHasQuestionImage(true)}>
                  拍照上传
                </UploadActionButton>
                <UploadActionButton onClick={() => setHasQuestionImage(true)}>
                  上传图片/PDF
                </UploadActionButton>
                <UploadActionButton onClick={() => setHasQuestionImage(true)}>
                  手动输入题目
                </UploadActionButton>
              </div>
              {hasQuestionImage ? (
                <div className="mt-6 rounded-2xl border border-calculation/30 bg-white px-4 py-3 text-left">
                  <p className="text-sm font-medium text-ink">识别到：一道数学题，包含题干和配图</p>
                  <button
                    className="mt-2 text-sm font-medium text-ink/58 underline decoration-calculation/60 underline-offset-4"
                    onClick={() => setHasQuestionImage(false)}
                    type="button"
                  >
                    重新上传
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </StepShell>
      );
    }

    if (currentStep === 2) {
      return (
        <StepShell
          accentClass="bg-accent-focus"
          description="写过程比只写答案更重要。没有过程，AI 只能猜；有步骤，才能判断你卡在哪一环。"
          eyebrow="Step 2"
          side={
            <>
              <div>
                <AbilityMascot ability="translation" size="card" />
                <p className="mt-4 text-base font-semibold text-ink">
                  再告诉我你是怎么做的。
                </p>
                <p className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm font-normal leading-6 text-ink/58">
                  只输入最终答案也可以，但诊断会更粗略。
                </p>
              </div>
              {hasStudentSolution ? (
                <div className="mt-6 space-y-2">
                  <InfoLine label="识别" value="3 步学生解答" />
                  <InfoLine label="最终答案" value="待确认" />
                  <InfoLine label="提醒" value="1 处符号需确认" />
                </div>
              ) : null}
            </>
          }
          title="上传你的解题过程"
        >
          <div className="rounded-[26px] border border-translation/25 bg-white p-5">
            <div className="flex flex-wrap gap-3">
              <UploadActionButton onClick={() => setHasStudentSolution(true)}>
                上传手写解答图片
              </UploadActionButton>
              <UploadActionButton onClick={() => setHasStudentSolution(true)}>
                手动输入解题过程
              </UploadActionButton>
              <UploadActionButton onClick={() => setHasStudentSolution(true)}>
                只输入最终答案
              </UploadActionButton>
            </div>
            <textarea
              className="mt-5 min-h-[260px] w-full resize-none rounded-[24px] border border-ink/10 bg-chalk px-5 py-4 text-[15px] font-normal leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-translation/45 focus:bg-white focus:ring-4 focus:ring-translation/15"
              onChange={(event) => setHasStudentSolution(event.target.value.trim().length > 0)}
              placeholder="请尽量写完整步骤，例如：设未知数、列式、计算、最终答案……"
            />
          </div>
        </StepShell>
      );
    }

    if (currentStep === 3) {
      const optionClass = (mode: StandardAnswerMode) =>
        standardAnswerMode === mode
          ? 'border-modeling/45 bg-accent-warning shadow-[0_10px_24px_rgba(255,217,151,0.24)]'
          : 'border-ink/10 bg-white hover:bg-chalk';

      return (
        <StepShell
          accentClass="bg-accent-warning"
          description="有标准答案时，诊断会更稳定；没有也可以先让 AI 尝试整理，后面再确认。"
          eyebrow="Step 3"
          side={
            <>
              <div>
                <AbilityMascot ability="review" size="card" />
                <p className="mt-4 text-base font-semibold text-ink">
                  有标准答案就放进来，没有也可以继续。
                </p>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/58">
                  这一页不是考试，不会因为没有标准答案就卡住。
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-modeling/25 bg-white px-4 py-3 text-sm font-normal leading-6 text-ink/62">
                标准答案主要用于核对步骤和定位断链，不会替代你的思考过程。
              </div>
            </>
          }
          title="是否有标准答案？"
        >
          <div className="grid grid-cols-3 gap-3">
            {[
              ['has-answer', '我有标准答案', '输入文字或粘贴步骤'] as const,
              ['no-answer', '我没有标准答案', '先让 AI 整理参考解法'] as const,
              ['teacher-explain', '我要上传老师讲解', '适合拍讲义或板书'] as const,
            ].map(([mode, title, description]) => (
              <button
                className={`rounded-[22px] border p-4 text-left transition ${optionClass(mode)}`}
                key={mode}
                onClick={() => {
                  setStandardAnswerMode(mode);
                  if (mode !== 'has-answer') {
                    setHasStandardAnswer(true);
                  } else {
                    setHasStandardAnswer(false);
                  }
                }}
                type="button"
              >
                <p className="text-base font-semibold text-ink">{title}</p>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/55">
                  {description}
                </p>
              </button>
            ))}
          </div>

          {standardAnswerMode === 'has-answer' ? (
            <textarea
              className="mt-5 min-h-[220px] w-full resize-none rounded-[24px] border border-ink/10 bg-white px-5 py-4 text-[15px] font-normal leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-modeling/50 focus:ring-4 focus:ring-modeling/15"
              onChange={(event) => setHasStandardAnswer(event.target.value.trim().length > 0)}
              placeholder="请粘贴标准答案、关键步骤或老师讲解要点。"
            />
          ) : standardAnswerMode === 'no-answer' ? (
            <div className="mt-5 rounded-[24px] border border-modeling/30 bg-white px-5 py-4 text-sm font-normal leading-7 text-ink/62">
              系统会先根据题目生成参考解法，但后续结果需要你确认。
            </div>
          ) : (
            <div className="mt-5 grid min-h-[220px] place-items-center rounded-[24px] border-2 border-dashed border-modeling/45 bg-white p-8 text-center">
              <div>
                <AbilityMascot ability="review" className="mx-auto" size="inline" />
                <p className="mt-4 text-base font-medium text-ink">
                  上传老师讲解答案图片
                </p>
                <p className="mt-2 text-sm font-normal text-ink/50">
                  当前点击即可模拟上传完成。
                </p>
                <div className="mt-5">
                  <UploadActionButton onClick={() => setHasStandardAnswer(true)}>
                    上传讲解图片
                  </UploadActionButton>
                </div>
              </div>
            </div>
          )}
        </StepShell>
      );
    }

    if (currentStep === 4) {
      return (
        <StepShell
          accentClass="bg-white"
          description="在诊断前，请先确认识别内容。符号识别错了，后面诊断就会跑偏。"
          eyebrow="Step 4"
          side={
            <>
              <div>
                <AbilityMascot ability="review" size="card" />
                <p className="mt-4 text-base font-semibold text-ink">
                  先确认我有没有认错字。
                </p>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/58">
                  重点看符号、条件数字和你的第二步列式。
                </p>
              </div>
              <button
                className={`mt-6 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  hasConfirmedRecognition
                    ? 'border-calculation/40 bg-accent-action text-ink'
                    : 'border-ink/10 bg-white text-ink/62 hover:bg-chalk'
                }`}
                onClick={() => setHasConfirmedRecognition((value) => !value)}
                type="button"
              >
                {hasConfirmedRecognition ? '✓ 已确认内容无误' : '我已检查，内容无误'}
              </button>
            </>
          }
          title="确认识别结果"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-5">
            <div className="space-y-4">
              <article className="rounded-[24px] border border-ink/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">题目</h3>
                  <Tag type="success">识别较清晰</Tag>
                </div>
                <textarea
                  className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-ink/8 bg-chalk px-4 py-3 text-sm font-normal leading-7 text-ink outline-none focus:border-calculation/45 focus:bg-white focus:ring-4 focus:ring-calculation/15"
                  defaultValue={mockQuestion}
                />
              </article>

              <article className="rounded-[24px] border border-ink/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">你的解题过程</h3>
                  <Tag type="warning">1 处需确认</Tag>
                </div>
                <div className="mt-3 space-y-2">
                  {mockStudentSteps.map((step, index) => (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm font-normal leading-6 text-ink/68 ${
                        index === 1
                          ? 'border-modeling/35 bg-accent-warning'
                          : 'border-ink/8 bg-chalk'
                      }`}
                      key={step}
                    >
                      {index + 1}. {step}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[24px] border border-ink/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">标准答案</h3>
                  <Tag type="info">{standardAnswerMode === 'no-answer' ? 'AI 生成参考' : '已提供'}</Tag>
                </div>
                <div className="mt-3 rounded-2xl border border-ink/8 bg-chalk px-4 py-3 text-sm font-normal leading-7 text-ink/68">
                  {standardAnswerMode === 'no-answer'
                    ? '未提供标准答案，将由 AI 生成参考解法。'
                    : mockStandardSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
                </div>
              </article>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-modeling/30 bg-accent-warning p-4">
                <h3 className="text-base font-semibold text-ink">不确定内容清单</h3>
                <p className="mt-2 text-sm font-normal leading-6 text-ink/62">
                  第 2 步中的符号可能是 x² 或 x，请确认。
                </p>
              </div>
              <div className="rounded-[24px] border border-ink/10 bg-white p-4">
                <h3 className="text-base font-semibold text-ink">诊断线索</h3>
                <div className="mt-3 space-y-2">
                  <InfoLine label="学科" value="数学" />
                  <InfoLine label="年级" value="初三" />
                  <InfoLine label="知识点" value="一次函数" />
                  <InfoLine label="来源" value="周测" />
                </div>
              </div>
            </aside>
          </div>
        </StepShell>
      );
    }

    return (
      <StepShell
        accentClass="bg-accent-action"
        description="系统将根据题目、你的解题过程和标准答案，分析你卡在哪一步，并给出下一步练习建议。"
        eyebrow="Step 5"
        side={
          <>
            <div>
              <AbilityMascot ability="model" size="card" />
              <p className="mt-4 text-base font-semibold text-ink">
                确认后，我再开始分析你卡在哪一步。
              </p>
              <p className="mt-2 text-sm font-normal leading-6 text-ink/58">
                这一步不会真的调用 AI，原型里会跳到 mock 诊断页。
              </p>
            </div>
            <PrimaryButton className="mt-6 w-full" onClick={() => navigate('/diagnosis')}>
              开始 AI 诊断
            </PrimaryButton>
          </>
        }
        title="准备开始诊断"
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            ['1', '断链位置判断', '定位你在哪个解题步骤卡住。'],
            ['2', '主要错因识别', '区分是读题、转化、建模还是计算问题。'],
            ['3', '六维能力影响', '更新对应能力的变化趋势。'],
            ['4', '变式练习推荐', '给你下一道刚好该练的题。'],
          ].map(([index, title, description]) => (
            <div
              className="rounded-[24px] border border-calculation/25 bg-white p-5"
              key={title}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-action text-sm font-semibold text-ink">
                {index}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm font-normal leading-6 text-ink/58">
                {description}
              </p>
            </div>
          ))}
        </div>
      </StepShell>
    );
  };

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between gap-6 rounded-[32px] border border-ink/10 bg-white p-6 shadow-card">
        <div>
          <Tag type="info">Upload Wizard</Tag>
          <h1 className="mt-4 text-[28px] font-semibold tracking-tight text-ink">
            开始一次错因诊断
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] font-normal leading-7 text-ink/62">
            一步一步放入题目、你的解题过程和标准答案，我会先帮你整理，再进入诊断。
          </p>
        </div>
        <div className="hidden items-center gap-4 rounded-[28px] border border-ink/8 bg-chalk px-5 py-4 lg:flex">
          <AbilityMascot ability="reading" size="card" />
          <div>
            <p className="text-sm font-semibold text-ink">上传不用一次填完</p>
            <p className="mt-1 max-w-[240px] text-sm font-normal leading-6 text-ink/58">
              每一步只处理一件事，少一点表单地狱。
            </p>
          </div>
        </div>
      </section>

      <WizardProgress currentStep={currentStep} isStepComplete={isStepComplete} />

      {renderStep()}

      <section className="sticky bottom-0 z-10 rounded-[28px] border border-ink/10 bg-white/92 p-4 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">{steps[currentStep - 1].hint}</p>
            {notice ? (
              <p className="mt-1 text-xs font-normal text-ink/50">{notice}</p>
            ) : (
              <p className="mt-1 text-xs font-normal text-ink/42">
                当前只使用 mock 数据，不会真实上传文件。
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-3">
            <SecondaryButton disabled={currentStep === 1} onClick={handleBack}>
              上一步
            </SecondaryButton>
            <PrimaryButton
              disabled={currentStep !== 5 && !isStepComplete(currentStep)}
              onClick={handleNext}
            >
              {nextLabel}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
