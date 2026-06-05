import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChallengeConversationDrawer from '../components/ChallengeConversationDrawer';
import NegotiationFeedbackModal from '../components/NegotiationFeedbackModal';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import {
  feedbackTypeFromVerificationScore,
  type NegotiationFeedbackResultType,
} from '../data/negotiationFeedback';
import { coachCopy } from '../data/languageSystem';
import { diagnosisRepair, paperScan, questionDiagnosis } from '../data/paperScan';

const selfOptions = [
  '题目没看清',
  '条件没写成式子',
  '模型没建起来',
  '方法没选对',
  '算错了',
  '没检查',
  '我不确定',
];

const getValidGuessIndex = (value: string | null) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < selfOptions.length
    ? parsed
    : null;
};

export default function DiagnosisPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const questionId = searchParams.get('question') || questionDiagnosis.questionId;
  const currentQuestion =
    paperScan.questions.find((question) => question.id === questionId) ??
    paperScan.questions[0];
  const isAiMode = searchParams.get('mode') === 'ai';
  const queryGuessIndex = getValidGuessIndex(searchParams.get('guess'));

  const [selectedGuess, setSelectedGuess] = useState<number | null>(
    queryGuessIndex,
  );
  const [fullSolutionOpen, setFullSolutionOpen] = useState(false);
  const [problemOpen, setProblemOpen] = useState(false);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackResult, setFeedbackResult] =
    useState<NegotiationFeedbackResultType>('observing');
  const [toastVisible, setToastVisible] = useState(false);

  const shownGuess =
    queryGuessIndex !== null
      ? selfOptions[queryGuessIndex]
      : selectedGuess !== null
        ? selfOptions[selectedGuess]
        : '模型没建起来';
  const repair = diagnosisRepair;

  const openAiDiagnosis = () => {
    if (selectedGuess === null) return;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('question', currentQuestion.id);
    nextParams.set('mode', 'ai');
    nextParams.set('guess', String(selectedGuess));
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showFeedback = (resultType: NegotiationFeedbackResultType) => {
    setFeedbackResult(resultType);
    setFeedbackOpen(true);
  };

  const handleUpdateRecord = () => {
    setFeedbackOpen(false);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2200);
  };

  if (!isAiMode) {
    return (
      <div className="mx-auto max-w-[920px] space-y-5">
        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Tag type="neutral">{currentQuestion.number}</Tag>
              <h1 className="mt-3 text-[30px] font-semibold tracking-tight text-ink">
                {currentQuestion.number}｜一次函数应用题
              </h1>
            </div>
            <span className="rounded-full bg-chalk px-3 py-1 text-xs font-medium text-ink/45">
              先看题目和步骤，不急着看结论
            </span>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-ink/8 bg-chalk p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">系统整理的题目</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/40">
                原题截图占位
              </span>
            </div>
            <p className="text-base leading-8 text-ink/70">
              {questionDiagnosis.originalQuestion}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <Tag type="success">参考步骤</Tag>
            <div className="mt-4 space-y-2">
              {questionDiagnosis.referenceSteps.map((step, index) => (
                <div
                  className="flex gap-3 rounded-2xl bg-chalk px-4 py-4 text-sm leading-6 text-ink/62"
                  key={`${step.title}-${index}`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-medium text-ink/45">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-ink/58">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <Tag type="warning">你的步骤</Tag>
            <div className="mt-4 space-y-2">
              {questionDiagnosis.compareStudentSteps.map((step, index) => (
                <div
                  className={`rounded-2xl px-4 py-4 text-sm leading-6 ${
                    step.highlight
                      ? 'border border-translation/25 bg-accent-focus text-ink'
                      : 'bg-chalk text-ink/62'
                  }`}
                  key={`${step.title}-${index}`}
                >
                  <div className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-medium text-ink/45">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{step.title}</p>
                      <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-ink/58">
                        {step.content}
                      </p>
                    </div>
                  </div>
                  {step.highlight ? (
                    <p className="mt-2 pl-9 text-xs leading-5 text-ink/48">
                      {step.note ||
                        '这里好像少了一个对应步骤，先记下来，等会儿再看系统怎么判断。'}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-translation/20 bg-white p-6 shadow-card ring-4 ring-translation/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Tag type="info">先自己判断</Tag>
              <h2 className="mt-3 text-[24px] font-semibold tracking-tight text-ink">
                你觉得这题主要卡在哪一步？
              </h2>
            </div>
            <span className="rounded-full bg-chalk px-3 py-1 text-xs font-medium text-ink/42">
              点一个就行
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selfOptions.map((option, index) => (
              <button
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selectedGuess === index
                    ? 'border-calculation/45 bg-accent-action text-ink'
                    : 'border-ink/10 bg-white text-ink/58 hover:bg-chalk'
                }`}
                key={option}
                onClick={() => setSelectedGuess(index)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <PrimaryButton
              disabled={selectedGuess === null}
              onClick={openAiDiagnosis}
            >
              {coachCopy.diagnosis.seeSystemThinking}
            </PrimaryButton>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[920px] space-y-5">
      {toastVisible ? (
        <div className="fixed right-8 top-8 z-50 rounded-2xl border border-calculation/25 bg-white px-5 py-4 text-sm font-medium text-ink shadow-soft">
          已更新这道题的记录。
        </div>
      ) : null}

      <section className="rounded-[1.5rem] border border-ink/10 bg-white px-5 py-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Tag type="neutral">{currentQuestion.number}</Tag>
            <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink">
              {repair.title}
            </h1>
            <p className="mt-1 text-sm leading-6 text-ink/52">
              {repair.subtitle}
            </p>
          </div>
          <SecondaryButton
            onClick={() => {
              const nextParams = new URLSearchParams(searchParams);
              nextParams.delete('mode');
              setSearchParams(nextParams);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            返回步骤对比
          </SecondaryButton>
        </div>
      </section>

      <section className="rounded-[1.35rem] border border-ink/8 bg-white px-4 py-3 shadow-[0_8px_22px_rgba(47,52,59,0.035)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {currentQuestion.number}｜一次函数应用题
            </p>
            <p className="mt-1 text-sm leading-6 text-ink/56">
              题目条件：{repair.problemPreview.short}
            </p>
          </div>
          <button
            className="rounded-full border border-ink/10 bg-chalk px-3 py-1.5 text-xs font-medium text-ink/55 transition hover:bg-white hover:text-ink"
            onClick={() => setProblemOpen((value) => !value)}
            type="button"
          >
            {problemOpen ? '收起题目' : '展开题目'}
          </button>
        </div>
        {problemOpen ? (
          <p className="mt-3 rounded-2xl bg-chalk px-4 py-3 text-sm leading-7 text-ink/62">
            {repair.problemPreview.full}
          </p>
        ) : null}
      </section>

      <section className="rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-2">
          {[
            ['主要卡点', repair.summary.mainIssue],
            ['具体断点', repair.summary.specificBreak],
            ['你的判断', shownGuess],
            [coachCopy.diagnosis.systemCertainty, repair.summary.certainty],
          ].map(([label, value]) => (
            <span
              className="rounded-full border border-ink/8 bg-chalk px-3 py-1.5 text-xs font-medium text-ink/56"
              key={label}
            >
              <span className="text-ink/38">{label}：</span>
              {value}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-translation/20 bg-white p-5 shadow-card ring-4 ring-translation/10">
        <Tag type="info">断点对照</Tag>
        <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight text-ink">
          {repair.repairCard.title}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-translation/20 bg-accent-focus p-4">
            <p className="text-sm font-semibold text-ink">
              {repair.repairCard.studentVersion.label}
            </p>
            <p className="mt-3 rounded-2xl bg-white/70 px-4 py-3 text-[18px] font-semibold leading-7 text-ink">
              {repair.repairCard.studentVersion.formula}
            </p>
            <p className="mt-3 text-xs font-medium text-ink/42">
              你直接写了利润式
            </p>
            <p className="mt-1 rounded-2xl bg-white/55 px-4 py-3 text-sm font-semibold text-ink/70">
              {repair.repairCard.studentVersion.fullExpression}
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-ink/8 bg-chalk p-4">
            <p className="text-sm font-semibold text-ink">
              {repair.repairCard.problem.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/62">
              {repair.repairCard.problem.text}
            </p>
            <div className="mt-4 rounded-2xl border border-ink/8 bg-white px-4 py-3 text-center">
              <p className="text-xs font-medium text-ink/38">关键差异</p>
              <p className="mt-2 text-[24px] font-semibold tracking-tight text-ink">
                {repair.repairCard.problem.keyDiff}
              </p>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-calculation/25 bg-accent-action p-4">
            <p className="text-sm font-semibold text-ink">
              {repair.repairCard.correctedVersion.label}
            </p>
            <p className="mt-3 rounded-2xl bg-white/75 px-4 py-3 text-[18px] font-semibold leading-7 text-ink">
              {repair.repairCard.correctedVersion.formula}
            </p>
            <p className="mt-3 text-xs font-medium text-ink/42">
              再代入利润式
            </p>
            <p className="mt-1 rounded-2xl bg-white/65 px-4 py-3 text-sm font-semibold text-ink/72">
              {repair.repairCard.correctedVersion.fullExpression}
            </p>
          </article>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-ink/8 bg-white px-4 py-4 text-center">
          <p className="text-xs font-medium text-ink/38">公式对照</p>
          <p className="mt-2 text-[20px] font-semibold leading-8 tracking-tight text-ink">
            <span className="text-ink/55">销量 = 10 + x</span>
            <span className="mx-3 text-ink/30">→</span>
            <span>销量 = 10 + 5x</span>
          </p>
        </div>

        {fullSolutionOpen ? (
          <div className="mt-4 rounded-[1.5rem] border border-ink/8 bg-chalk p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">完整解法</p>
              <span className="rounded-full bg-accent-focus px-3 py-1 text-xs font-medium text-ink/60">
                关键卡点：销量变化关系
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {repair.fullSolution.map((step, index) => (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                    index === 2 ? 'bg-accent-focus text-ink' : 'bg-white text-ink/62'
                  }`}
                  key={step}
                >
                  {index + 1}. {step}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <div className="sticky bottom-4 z-20 rounded-[1.5rem] border border-ink/10 bg-white/95 px-4 py-3 shadow-[0_18px_48px_rgba(47,52,59,0.14)] backdrop-blur">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <PrimaryButton to="/practice">我懂了，去练这一块</PrimaryButton>
          <SecondaryButton onClick={() => setChallengeOpen(true)}>
            我觉得不是这里
          </SecondaryButton>
          <button
            className="rounded-full px-4 py-2 text-sm font-medium text-ink/48 transition hover:bg-chalk hover:text-ink"
            onClick={() => setFullSolutionOpen((value) => !value)}
            type="button"
          >
            {fullSolutionOpen ? '收起完整解法' : '看完整解法'}
          </button>
        </div>
      </div>

      {verifyOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/18 px-4 backdrop-blur-sm">
          <section className="w-full max-w-[460px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(47,52,59,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag type="warning">小验证</Tag>
                <h2 className="mt-3 text-xl font-semibold text-ink">
                  只验证刚才这一小步
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  不做完整大题，只看“文字条件能不能写成关系”。
                </p>
              </div>
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/8 bg-chalk text-sm font-medium text-ink/45 hover:text-ink"
                onClick={() => setVerifyOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="mt-5 space-y-2">
              {[
                '把“售价每降低 1 元，销量增加 5 本”写成变化关系。',
                '指出哪个量是自变量。',
                '说明为什么不能直接写利润公式。',
              ].map((task, index) => (
                <div
                  className="flex gap-3 rounded-2xl bg-chalk px-4 py-3 text-sm leading-6 text-ink/62"
                  key={task}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-medium text-ink/45">
                    {index + 1}
                  </span>
                  {task}
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <SecondaryButton onClick={() => setVerifyOpen(false)}>
                先返回
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  setVerifyOpen(false);
                  showFeedback(feedbackTypeFromVerificationScore(1));
                }}
              >
                查看验证结果
              </PrimaryButton>
            </div>
          </section>
        </div>
      ) : null}

      <ChallengeConversationDrawer
        currentJudgment="条件没写成式子"
        onClose={() => setChallengeOpen(false)}
        onReadyToRejudge={showFeedback}
        open={challengeOpen}
      />

      <NegotiationFeedbackModal
        onClose={() => setFeedbackOpen(false)}
        onPrimary={() => {
          if (feedbackResult === 'observing') {
            setFeedbackOpen(false);
            return;
          }
          handleUpdateRecord();
        }}
        onSecondary={() => setFeedbackOpen(false)}
        open={feedbackOpen}
        resultType={feedbackResult}
      />
    </div>
  );
}
