import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';
import { paperScan, type PaperQuestion } from '../data/paperScan';

const statusStyle: Record<PaperQuestion['status'], string> = {
  needs_review: 'bg-accent-focus text-ink',
  needs_confirm: 'bg-accent-warning text-ink',
  skipped: 'bg-chalk text-ink/55',
};

export default function UploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paperUploaded, setPaperUploaded] = useState(
    searchParams.get('figmaState') === 'scan-result',
  );

  const openQuestion = (questionId: string) => {
    navigate(`/diagnosis?question=${questionId}`);
  };

  if (paperUploaded) {
    return (
      <div className="mx-auto max-w-[920px] space-y-5">
        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_120px]">
            <div>
              <Tag type="success">AI 已整理</Tag>
              <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-ink">
                这张卷子里，有 {paperScan.detectedWrongQuestions} 道题需要复盘
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/58">
                先不用一题一题找，系统已经把可能需要复盘的题整理出来了。
              </p>
            </div>
            <div className="hidden rounded-[1.5rem] bg-accent-action p-3 md:block">
              <AbilityMascot ability="review" size="card" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-chalk px-4 py-3">
              <p className="text-xs text-ink/42">总题数</p>
              <p className="mt-1 text-xl font-semibold text-ink">
                {paperScan.totalQuestions}
              </p>
            </div>
            <div className="rounded-2xl bg-accent-focus px-4 py-3">
              <p className="text-xs text-ink/42">待复盘</p>
              <p className="mt-1 text-xl font-semibold text-ink">
                {paperScan.detectedWrongQuestions}
              </p>
            </div>
            <div className="rounded-2xl bg-accent-warning px-4 py-3">
              <p className="text-xs text-ink/42">需要确认</p>
              <p className="mt-1 text-xl font-semibold text-ink">1</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Tag type="neutral">错题清单</Tag>
              <p className="mt-2 text-sm leading-6 text-ink/52">
                这里只做总览，不在这里展开长篇诊断。
              </p>
            </div>
            <SecondaryButton onClick={() => setPaperUploaded(false)}>
              重新上传
            </SecondaryButton>
          </div>

          <div className="mt-5 grid gap-3">
            {paperScan.questions.map((question) => (
              <article
                className="grid grid-cols-1 items-center gap-4 rounded-[1.5rem] border border-ink/8 bg-white p-4 transition hover:border-calculation/25 hover:bg-chalk/60 md:grid-cols-[96px_minmax(0,1fr)_120px]"
                key={question.id}
              >
                <div>
                  <p className="text-lg font-semibold text-ink">{question.number}</p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyle[question.status]}`}
                  >
                    {question.statusText}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    初步判断：{question.initialDiagnosisText}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/50">
                    {question.reason}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {question.studentWorkExtracted ? (
                      <Tag type="success">已提取作答</Tag>
                    ) : (
                      <Tag type="warning">作答待确认</Tag>
                    )}
                    {question.correctionMarksDetected ? (
                      <Tag type="info">有批改痕迹</Tag>
                    ) : (
                      <Tag type="neutral">无明显错号</Tag>
                    )}
                  </div>
                </div>

                <div className="flex justify-start md:justify-end">
                  <PrimaryButton
                    onClick={() => openQuestion(question.id)}
                    variant={question.status === 'skipped' ? 'ghost' : 'primary'}
                  >
                    {question.actionLabel}
                  </PrimaryButton>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[920px]">
      <section className="grid grid-cols-1 gap-5 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card lg:grid-cols-[minmax(0,1fr)_260px]">
        <main>
          <Tag type="success">整卷上传</Tag>
          <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-ink">
            上传整张试卷
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink/58">
            系统会先帮你找出需要复盘的题。
          </p>

          <div className="mt-6 grid min-h-[380px] place-items-center rounded-[2rem] border-2 border-dashed border-calculation/45 bg-accent-action p-8 text-center">
            <div>
              <div className="mx-auto mb-5 rounded-[1.5rem] bg-white/70 p-3">
                <AbilityMascot ability="reading" size="card" />
              </div>
              <p className="text-xl font-semibold text-ink">
                把试卷图片拖到这里，或点击上传
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/50">
                当前是 mock 流程，点击任意上传方式即可生成错题清单。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {['拍照上传', '上传图片/PDF', '手动添加错题'].map((label) => (
                  <SecondaryButton key={label} onClick={() => setPaperUploaded(true)}>
                    {label}
                  </SecondaryButton>
                ))}
              </div>
              <PrimaryButton
                className="mt-5"
                onClick={() => setPaperUploaded(true)}
              >
                模拟识别整张试卷
              </PrimaryButton>
            </div>
          </div>
        </main>

        <aside className="self-start rounded-[1.5rem] border border-ink/8 bg-white p-4">
          <AbilityMascot ability="review" size="card" />
          <h2 className="mt-4 text-base font-semibold text-ink">拍照小建议</h2>
          <p className="mt-2 text-sm leading-6 text-ink/52">
            尽量拍清楚题号、批改痕迹和你的解题过程。不要把多张卷子叠在一起拍。
          </p>
          <div className="mt-4 rounded-2xl bg-chalk px-4 py-3 text-sm leading-6 text-ink/54">
            上传完成后，会先进入错题清单，不会直接跳到诊断。
          </div>
        </aside>
      </section>
    </div>
  );
}
