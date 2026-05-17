import { useState } from 'react';
import AbilityMascot from '../components/AbilityMascot';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StepProgress from '../components/StepProgress';
import Tag from '../components/Tag';

const standardSteps = [
  '设销售单价为 x，销量为 y',
  '根据题意建立一次函数关系',
  '代入已知点求出函数表达式',
  '根据目标利润建立方程',
  '求解并检验答案',
];

const studentSteps = ['设未知数', '直接代入售价计算', '得出答案'];

const abilityImpacts = [
  {
    ability: '条件转化',
    impact: '-8',
    reason: '未能把文字关系转成函数关系',
  },
  {
    ability: '建立模型',
    impact: '-6',
    reason: '没有建立一次函数模型',
  },
  {
    ability: '计算执行',
    impact: '不变',
    reason: '没有进入主要计算阶段',
  },
];

export default function DiagnosisPage() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleAddMistake = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <div className="space-y-6">
      {toastVisible ? (
        <div className="fixed right-8 top-8 z-50 rounded-2xl border border-leaf/15 bg-white px-5 py-4 text-sm font-medium text-leaf shadow-soft">
          已加入错题本，稍后可以在技能修复库中查看。
        </div>
      ) : null}

      <section className="grid grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] gap-6">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <Tag type="neutral">原题</Tag>
              <span className="text-sm font-medium text-ink/42">一次函数应用题</span>
            </div>
            <p className="mt-5 rounded-[1.5rem] bg-chalk p-5 text-lg font-semibold leading-8 text-ink/72">
              某商店销售一种商品，已知售价与销量之间满足一次函数关系。请根据条件建立函数表达式，并求最大利润。
            </p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <Tag type="success">标准答案步骤</Tag>
              <span className="rounded-full bg-meadow px-3 py-1 text-xs font-medium text-leaf">
                5 步
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {standardSteps.map((step, index) => (
                <div
                  className="flex items-start gap-3 rounded-[1.35rem] border border-ink/5 bg-white p-4"
                  key={step}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-meadow text-sm font-medium text-leaf">
                    {index + 1}
                  </span>
                  <p className="font-semibold leading-7 text-ink/68">{step}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <Tag type="warning">你的解题过程</Tag>
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-honey">
                发现跳步
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {studentSteps.map((step, index) => {
                const risky = index === 1;
                return (
                  <div
                    className={`flex items-start gap-3 rounded-[1.35rem] border p-4 ${
                      risky
                        ? 'border-peach/40 bg-cream'
                        : 'border-ink/5 bg-white'
                    }`}
                    key={step}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-medium ${
                        risky ? 'bg-peach/30 text-coral' : 'bg-chalk text-ink/55'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p
                      className={`font-semibold leading-7 ${
                        risky ? 'text-coral' : 'text-ink/68'
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-peach/35 bg-peach/15 p-5">
              <p className="text-sm font-medium text-coral">问题高亮</p>
              <p className="mt-2 font-medium leading-7 text-ink">
                第 2 步：你跳过了建立函数关系，直接进入计算。
              </p>
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-translation/25 bg-translationSoft p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag type="warning">一句话诊断</Tag>
                <h2 className="mt-5 font-display text-[28px] font-semibold leading-tight text-ink">
                  你这道题不是计算错，而是没有把文字条件转化成函数模型。
                </h2>
              </div>
              <div className="flex max-w-[200px] flex-col items-center gap-3">
                <AbilityMascot ability="translation" size="hero" />
                <p className="rounded-2xl border border-ink/10 bg-white/70 px-3 py-2 text-center text-xs font-medium leading-5 text-ink/62">
                  这题不是不会，是条件还没转成模型。
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-3">
              <AbilityMascot ability="translation" size="card" />
              <p className="text-sm font-medium leading-6 text-ink/58">
                断链集中在条件转化到建模这段，先把文字关系拆出来。
              </p>
            </div>
            <StepProgress
              activeSteps={[1, 2]}
              subtitle="橙色高亮表示本题主要断链位置。"
              title="断链位置"
            />
            <p className="mt-5 rounded-[1.5rem] bg-readingSoft p-4 text-sm font-normal leading-6 text-ink/62">
              你读懂了题目大意，但没有把售价变化和销量变化之间的关系转成函数表达式。
            </p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <Tag type="neutral">错因标签</Tag>
            <div className="mt-5 flex flex-wrap gap-3">
              <Tag type="warning">条件转化失败</Tag>
              <Tag type="warning">模型建立不足</Tag>
              <Tag type="info">题型识别不稳定</Tag>
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <Tag type="info">掌握度等级</Tag>
            <div className="mt-5 rounded-[1.5rem] bg-reviewSoft p-5">
              <p className="text-sm font-medium text-lagoon">当前掌握度</p>
              <p className="mt-2 font-display text-[28px] font-semibold text-ink">
                L2 初步掌握
              </p>
            </div>
            <p className="mt-4 text-sm font-normal leading-6 text-ink/62">
              判断依据：你能理解题目背景，但在建立模型前卡住，说明还不能独立完成此类题。
            </p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
            <Tag type="success">能力影响</Tag>
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-ink/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-chalk text-ink/55">
                  <tr>
                    <th className="px-4 py-3 font-medium">能力</th>
                    <th className="px-4 py-3 font-medium">本次影响</th>
                    <th className="px-4 py-3 font-medium">原因</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {abilityImpacts.map((item) => (
                    <tr className="bg-white" key={item.ability}>
                      <td className="px-4 py-4 font-medium text-ink">
                        <span className="flex items-center gap-2">
                          <AbilityMascot
                            ability={
                              item.ability === '条件转化'
                                ? 'translation'
                                : item.ability === '建立模型'
                                  ? 'model'
                                  : 'calculation'
                            }
                            size="inline"
                          />
                          {item.ability}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-4 font-medium ${
                          item.impact === '不变' ? 'text-ink/50' : 'text-coral'
                        }`}
                      >
                        {item.impact}
                      </td>
                      <td className="px-4 py-4 font-semibold leading-6 text-ink/62">
                        {item.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <AbilityMascot ability="translation" size="card" />
            <div>
            <Tag type="success">下一步行动</Tag>
            <p className="mt-3 text-sm font-normal text-ink/58">
              先把这道题沉淀到错题本，再用类似题修复“条件转化 → 建立模型”。
            </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <PrimaryButton onClick={handleAddMistake} variant="sun">
              加入错题本
            </PrimaryButton>
            <PrimaryButton to="/practice">做一道类似题</PrimaryButton>
            <SecondaryButton>查看分步提示</SecondaryButton>
            <SecondaryButton to="/upload">重新上传答案</SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}
