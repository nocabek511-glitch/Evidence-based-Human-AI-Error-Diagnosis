import { buildPublicUrl, PUBLIC_BASE_URL } from '../config/publicUrls';

type RouteEntry = {
  name: string;
  route: string;
  description: string;
};

type StateEntry = {
  name: string;
  page: string;
  route: string;
  description: string;
  mock?: boolean;
};

const pages: RouteEntry[] = [
  {
    name: '今日学习路线',
    route: '/',
    description: '首页主任务、快捷入口与接下来复习。',
  },
  {
    name: '上传错题',
    route: '/upload',
    description: '分步上传题目、解答与标准答案。',
  },
  {
    name: '题目复盘',
    route: '/diagnosis?question=q8',
    description: '原题、参考步骤、学生步骤与自我判断。',
  },
  {
    name: '断点诊断',
    route: '/diagnosis?question=q8&mode=ai&guess=2',
    description: '断点对照、公式差异与修复建议。',
  },
  {
    name: '错题库',
    route: '/mistakes',
    description: '错题列表、搜索与分类筛选。',
  },
  {
    name: '错题详情',
    route: '/mistakes/1',
    description: '单道错题档案、练习记录与分层提示。',
  },
  {
    name: '小练习',
    route: '/practice',
    description: '单目标练习工作台与作答区。',
  },
  {
    name: '我的进步',
    route: '/abilities',
    description: '六维总览、能力卡片与学习画像。',
  },
  {
    name: '学习安排',
    route: '/plan',
    description: 'Day 1 当前计划与 Day 2、Day 3 路线预览。',
  },
];

const diagnosisStates: StateEntry[] = [
  {
    name: '诊断页 - 断点对照默认状态',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=breakpoint-default',
    description: '展示三栏断点对照和底部主要操作。',
  },
  {
    name: '诊断页 - 学生质疑抽屉初始状态',
    page: '题目诊断',
    route: '/diagnosis?question=q8&mode=ai&guess=0&figmaState=dispute-basis',
    description: '打开右侧抽屉，展示断点选择和依据输入框。',
    mock: true,
  },
  {
    name: '诊断页 - 学生质疑已填写状态',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=dispute-filled',
    description: '预选“后面计算出了问题”，并填入示例说明。',
    mock: true,
  },
  {
    name: '诊断页 - 依据提交后反馈',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=dispute-submitted',
    description: '展示收到依据后的当前判断和后续操作。',
    mock: true,
  },
  {
    name: '诊断页 - 小验证状态',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=dispute-validation',
    description: '展示 3 个用于确认本题断点的微任务。',
    mock: true,
  },
  {
    name: '诊断页 - 小验证结果状态',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=dispute-result',
    description: '展示 2/3 通过和本题断点临时校准结果。',
    mock: true,
  },
  {
    name: '诊断页 - 完整解法展开状态',
    page: '题目诊断',
    route:
      '/diagnosis?question=q8&mode=ai&guess=0&figmaState=solution-open',
    description: '自动展开正式诊断页中的完整解法区域。',
  },
];

const abilityStates: StateEntry[] = [
  {
    name: '能力协商 - 判断依据',
    page: '我的进步',
    route: '/abilities?figmaState=negotiation-basis',
    description: '右侧抽屉展示 AI 当前依据、补充方向和自然语言输入。',
    mock: true,
  },
  {
    name: '能力协商 - 小验证',
    page: '我的进步',
    route: '/abilities?figmaState=negotiation-validation',
    description: '右侧抽屉展示 3 道能力微任务及通过状态按钮。',
    mock: true,
  },
  {
    name: '能力协商 - 临时更新',
    page: '我的进步',
    route: '/abilities?figmaState=negotiation-result',
    description: '展示 3/3 通过、临时上调和后续操作。',
    mock: true,
  },
  {
    name: '能力协商 - 继续验证',
    page: '我的进步',
    route: '/abilities?figmaState=negotiation-continue',
    description: '展示第二轮稍难的 mock 验证任务。',
    mock: true,
  },
];

const otherStates: StateEntry[] = [
  {
    name: '首页 - 调整计划弹窗',
    page: '今日学习路线',
    route: '/?figmaState=adjust-plan',
    description: '自动打开“换个安排”轻量弹窗。',
    mock: true,
  },
  {
    name: '上传页 - 识别完成',
    page: '上传错题',
    route: '/upload?figmaState=scan-result',
    description: '展示整卷识别后的错题清单和统计摘要。',
    mock: true,
  },
  {
    name: '小练习 - 答题中',
    page: '小练习',
    route: '/practice?figmaState=question',
    description: '展示目标、题目、起步判断和作答区。',
  },
  {
    name: '小练习 - 提示展开',
    page: '小练习',
    route: '/practice?figmaState=hint-open',
    description: '自动展开右侧“换种提醒”选项。',
  },
  {
    name: '小练习 - 提交反馈',
    page: '小练习',
    route: '/practice?figmaState=result',
    description: '自动显示提交后的练习反馈和关联旧错题。',
    mock: true,
  },
];

function PublicLink({
  children,
  route,
}: {
  children: string;
  route: string;
}) {
  return (
    <a
      className="inline-flex min-h-10 items-center justify-center rounded-full border border-calculation/30 bg-accent-action px-4 py-2 text-sm font-medium text-ink shadow-[0_5px_14px_rgba(47,52,59,0.05)] transition hover:-translate-y-0.5 hover:border-calculation/50"
      href={buildPublicUrl(route)}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

function UrlText({ route }: { route: string }) {
  return (
    <a
      className="break-all text-sm leading-6 text-ink/58 underline decoration-ink/15 underline-offset-4 hover:text-ink"
      href={buildPublicUrl(route)}
      rel="noreferrer"
      target="_blank"
    >
      {buildPublicUrl(route)}
    </a>
  );
}

function StateList({ items }: { items: StateEntry[] }) {
  return (
    <div className="mt-4 space-y-4">
      {items.map((item) => (
        <article
          className="rounded-[1.5rem] border border-ink/8 bg-white p-5 shadow-[0_8px_24px_rgba(47,52,59,0.035)]"
          key={item.route}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
                {item.mock ? (
                  <span className="rounded-full bg-accent-warning px-2.5 py-1 text-xs font-medium text-ink/52">
                    Mock capture state
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-xs font-medium text-ink/38">
                所属页面：{item.page}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/50">
                {item.description}
              </p>
              <div className="mt-3">
                <UrlText route={item.route} />
              </div>
            </div>
            <div className="md:self-center">
              <PublicLink route={item.route}>打开状态</PublicLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function FigmaRoutesPage() {
  return (
    <main className="min-h-screen bg-[#f8faf9] px-5 py-8 text-ink sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <header className="rounded-[2rem] border border-ink/8 bg-white p-6 shadow-card sm:p-8">
          <span className="rounded-full bg-accent-focus px-3 py-1.5 text-xs font-medium text-ink/58">
            Temporary design capture index
          </span>
          <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-ink">
            Figma 捕捉路由
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink/55">
            以下主链接全部使用公网部署地址，可直接复制到 html.to.design。
            这个页面只用于设计捕捉，不会进入正式导航。
          </p>
          <div className="mt-5 rounded-2xl bg-chalk px-4 py-3">
            <p className="text-xs font-medium text-ink/38">公网基础地址</p>
            <p className="mt-1 break-all text-sm font-semibold text-ink/68">
              {PUBLIC_BASE_URL}
            </p>
          </div>
        </header>

        <section className="mt-7">
          <div>
            <h2 className="text-[22px] font-semibold text-ink">1. 主要页面</h2>
            <p className="mt-1 text-sm text-ink/45">
              可直接通过 URL 打开的正式页面。
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {pages.map((item) => (
              <article
                className="rounded-[1.5rem] border border-ink/8 bg-white p-5 shadow-[0_8px_24px_rgba(47,52,59,0.035)]"
                key={item.route}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {item.name}
                    </h3>
                    <code className="mt-2 inline-block rounded-lg bg-chalk px-2 py-1 text-xs text-ink/48">
                      {item.route}
                    </code>
                  </div>
                  <PublicLink route={item.route}>打开页面</PublicLink>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink/48">
                  {item.description}
                </p>
                <div className="mt-3 border-t border-ink/8 pt-3">
                  <UrlText route={item.route} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div>
            <h2 className="text-[22px] font-semibold text-ink">
              2. 诊断页状态
            </h2>
            <p className="mt-1 text-sm text-ink/45">
              断点对照、质疑抽屉、小验证与完整解法均可通过公网 URL
              直接打开。
            </p>
          </div>
          <StateList items={diagnosisStates} />
        </section>

        <section className="mt-8">
          <div>
            <h2 className="text-[22px] font-semibold text-ink">
              3. 能力画像状态
            </h2>
            <p className="mt-1 text-sm text-ink/45">
              保留已有能力协商的四个稳定捕捉状态。
            </p>
          </div>
          <StateList items={abilityStates} />
        </section>

        <section className="mt-8">
          <div>
            <h2 className="text-[22px] font-semibold text-ink">
              4. 其他 UI 状态
            </h2>
            <p className="mt-1 text-sm text-ink/45">
              首页弹窗、上传结果及其他可稳定复现的界面。
            </p>
          </div>
          <StateList items={otherStates} />
        </section>
      </div>
    </main>
  );
}
