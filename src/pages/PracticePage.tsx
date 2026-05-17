import { useState } from 'react';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Tag from '../components/Tag';

const hints = [
  {
    id: 'H1',
    label: '提示题目关键条件',
    content:
      '关键条件是“售价每降低 1 元，每天销量增加 5 本”。它描述的是售价和销量之间的变化关系。',
  },
  {
    id: 'H2',
    label: '提示建模方向',
    content:
      '先设售价为 x，销量为 y。销量会随着售价降低而增加，所以 y 应该写成关于 x 的一次函数。',
  },
  {
    id: 'H3',
    label: '提示下一步',
    content:
      '找一个基准售价和对应销量，再用“每降低 1 元，销量增加 5 本”写出 y 与 x 的关系。',
  },
  {
    id: 'H4',
    label: '查看完整解析',
    content:
      '完整思路：设售价为 x，销量为 y；根据基准点建立 y = kx + b；再用利润 = 单本利润 × 销量 建立关于 x 的二次函数；最后求最大值并检验售价范围。',
  },
];

export default function PracticePage() {
  const [activeHint, setActiveHint] = useState('H1');
  const [feedbackVisible, setFeedbackVisible] = useState(true);
  const activeHintContent = hints.find((hint) => hint.id === activeHint)?.content;

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Tag type="success">练习目标</Tag>
            <h1 className="mt-4 font-display text-[32px] font-semibold tracking-tight text-ink">
              把文字条件转化为函数表达式
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] font-normal leading-7 text-ink/60">
              这道变式题针对上一题的主要错因，不完全一样，但练的是同一个能力。
            </p>
            <div className="mt-4 inline-flex rounded-full border border-translation/25 bg-accent-focus px-4 py-2 text-sm font-medium text-ink/70">
              本关目标：文字条件 → 函数表达式
            </div>
          </div>
          <div className="grid min-w-[320px] gap-3 rounded-[1.75rem] bg-accent-focus p-4">
            <div className="flex items-center gap-3">
              <AbilityMascot ability="translation" size="hero" />
              <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium leading-6 text-ink/62">
                本关陪你练条件转化，先别急着算。
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-ink/45">关联错题</span>
              <span className="text-sm font-medium text-ink">
                一次函数应用题 - 商品销售问题
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-ink/45">当前难度</span>
              <Tag type="warning">L2 → L3</Tag>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_360px] gap-6">
        <main className="space-y-6">
          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Tag type="info">变式题</Tag>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                  文具店笔记本销售问题
                </h2>
              </div>
              <AbilityMascot ability="model" size="card" />
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-modeling/20 bg-white p-5 shadow-[inset_4px_0_0_#FFD997]">
              <p className="text-base font-normal leading-8 text-ink/72">
                某文具店销售笔记本，已知售价每降低 1 元，每天销量增加 5 本。请建立利润与售价之间的函数关系，并求最大利润。
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AbilityMascot ability="calculation" size="card" />
                <Tag type="neutral">答题区</Tag>
              </div>
              <span className="rounded-full bg-accent-action px-4 py-2 text-sm font-medium text-ink/55">建议写完整过程</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {['步骤 1：设变量', '步骤 2：建立关系', '步骤 3：求解并检查'].map((step) => (
                <div className="rounded-2xl border border-calculation/20 bg-accent-action px-4 py-3 text-sm font-medium text-ink/62" key={step}>
                  {step}
                </div>
              ))}
            </div>
            <textarea
              className="mt-5 min-h-[360px] w-full resize-none rounded-[1.5rem] border border-ink/10 bg-chalk px-5 py-4 text-sm font-semibold leading-7 text-ink outline-none transition placeholder:text-ink/35 focus:border-sky focus:bg-white focus:ring-4 focus:ring-sky/15"
              placeholder="请写出你的完整解题过程，不要只写最终答案。"
            />
            <div className="mt-5 flex justify-end gap-3">
              <SecondaryButton>保存草稿</SecondaryButton>
              <PrimaryButton onClick={() => setFeedbackVisible(true)}>
                提交答案
              </PrimaryButton>
            </div>
          </article>
        </main>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-ink/10 bg-accent-warning p-5 shadow-card">
            <Tag type="warning">当前要避免的错误</Tag>
            <p className="mt-4 text-base font-medium leading-7 text-ink/72">
              不要直接代数计算。先找出两个变量之间的关系。
            </p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <Tag type="info">分层提示</Tag>
              <AbilityMascot ability="reading" size="inline" />
            </div>
            <div className="mt-5 grid gap-3">
              {hints.map((hint, index) => (
                <button
                  className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm font-medium transition ${
                    activeHint === hint.id
                      ? 'border-translation/25 bg-accent-focus text-ink'
                      : 'border-ink/10 bg-white text-ink/62 hover:bg-chalk'
                  }`}
                  key={hint.id}
                  onClick={() => setActiveHint(hint.id)}
                  type="button"
                >
                  <span className="inline-flex items-center gap-2">
                    <AbilityMascot
                      ability={
                        index === 0
                          ? 'reading'
                          : index === 1
                            ? 'translation'
                            : index === 2
                              ? 'model'
                              : 'review'
                      }
                      size="inline"
                    />
                    {hint.id} {hint.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-5 rounded-[1.5rem] bg-chalk p-4 text-sm font-normal leading-7 text-ink/64">
              {activeHintContent}
            </p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <Tag type="neutral">关联旧错题</Tag>
            <p className="mt-5 text-sm font-normal leading-6 text-ink/55">
              你之前在类似题中错在：
            </p>
            <p className="mt-2 rounded-[1.5rem] bg-accent-warning p-4 text-base font-medium text-ink">
              没有建立函数模型。
            </p>
            <SecondaryButton to="/mistakes/1" className="mt-5 w-full">
              查看旧错题
            </SecondaryButton>
          </article>
        </aside>
      </section>

      {feedbackVisible ? (
        <section className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <AbilityMascot ability="method" size="card" />
              <div>
              <Tag type="warning">练习反馈</Tag>
              <h2 className="mt-3 font-display text-[28px] font-semibold text-ink">
                结果：部分正确
              </h2>
              </div>
            </div>
            <button
              className="rounded-full bg-chalk px-4 py-2 text-xs font-medium text-ink/55 hover:bg-mist"
              onClick={() => setFeedbackVisible(false)}
              type="button"
            >
              收起反馈
            </button>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="rounded-[1.5rem] bg-accent-action p-5">
              <p className="text-xs font-medium text-leaf">你这次进步了</p>
              <p className="mt-3 font-semibold leading-7 text-ink/68">
                已经能设出变量，并尝试建立关系。
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-accent-warning p-5">
              <p className="text-xs font-medium text-honey">还需要修正</p>
              <p className="mt-3 font-semibold leading-7 text-ink/68">
                函数表达式中销量变化方向写反了。
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-accent-focus p-5">
              <p className="text-xs font-medium text-lagoon">本次断链</p>
              <p className="mt-3 font-semibold leading-7 text-ink/68">
                条件转化后半段
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5">
              <p className="text-xs font-medium text-ink/45">建议</p>
              <p className="mt-3 font-semibold leading-7 text-ink/68">
                再练 1 道“销量随价格变化”的题。
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
