import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AbilityMascot from './AbilityMascot';
import PrimaryButton from './PrimaryButton';

const navItems = [
  { label: '首页', path: '/', mark: 'H' },
  { label: '上传错题', path: '/upload', mark: 'U' },
  { label: '错题本', path: '/mistakes', mark: 'M' },
  { label: '练习', path: '/practice', mark: 'P' },
  { label: '能力图', path: '/abilities', mark: 'A' },
  { label: '学习计划', path: '/plan', mark: 'L' },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: '今日学习面板',
    subtitle: '根据近期错题和能力变化，看看今天最值得练什么。',
  },
  '/dashboard': {
    title: '今日学习面板',
    subtitle: '根据近期错题和能力变化，看看今天最值得练什么。',
  },
  '/upload': {
    title: '开启诊断任务',
    subtitle: '上传一道卡住的题，我们用 mock 数据模拟一次学习教练反馈。',
  },
  '/diagnosis': {
    title: 'AI 错因诊断结果',
    subtitle: '系统已根据你的解题过程定位主要断链位置。',
  },
  '/mistakes': {
    title: '错题本',
    subtitle: '这里不是错题垃圾桶，而是你的错误数据库。',
  },
  '/practice': {
    title: '变式小关卡',
    subtitle: '下一步很明确：先做一关，不急着挑战全图。',
  },
  '/ability': {
    title: '六维能力图 / 学习画像',
    subtitle: '用分数、证据和趋势解释你的解题能力变化。',
  },
  '/abilities': {
    title: '六维能力图 / 学习画像',
    subtitle: '用分数、证据和趋势解释你的解题能力变化。',
  },
  '/plan': {
    title: '三日学习计划',
    subtitle: '根据你的近期错题、掌握度和能力变化生成。',
  },
};

export default function AppLayout() {
  const location = useLocation();
  const page =
    pageTitles[location.pathname] ??
    (location.pathname.startsWith('/mistakes/')
      ? { title: '错题详情', subtitle: '查看这道错题的诊断和练习记录。' }
      : pageTitles['/']);

  return (
    <div className="h-screen overflow-hidden bg-learning-field bg-soft-grid bg-[length:auto,32px_32px] p-5 text-ink">
      <div className="mx-auto flex h-[calc(100vh-40px)] max-w-[1560px] overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft">
        <aside className="h-full w-72 shrink-0 overflow-hidden border-r border-ink/10 bg-[#FBFCFD] px-5 py-6">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <div className="flex items-center gap-4">
              <AbilityMascot ability="reading" size="avatar" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-lagoon">
                  Study Mate
                </p>
                <h1 className="mt-1 font-display text-xl font-semibold leading-tight">
                  小元学习基地
                </h1>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/60">
              白天帮你拆错因，晚上帮你收任务。
            </p>
            <div className="mt-4 flex gap-2">
              <span className="h-1.5 flex-1 rounded-full bg-review/35" />
              <span className="h-1.5 flex-1 rounded-full bg-calculation/35" />
              <span className="h-1.5 flex-1 rounded-full bg-modeling/35" />
              <span className="h-1.5 flex-1 rounded-full bg-reading/35" />
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => {
                  const isDashboardHome =
                    item.path === '/' && location.pathname === '/dashboard';
                  const active = isActive || isDashboardHome;

                  return `group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'border-review/25 bg-reviewSoft text-ink shadow-card'
                      : 'border-transparent bg-transparent text-ink/60 hover:border-ink/10 hover:bg-white hover:text-ink'
                  }`;
                }}
                end={item.path === '/'}
                key={item.path}
                to={item.path}
              >
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-xs font-medium text-lagoon shadow-[inset_0_0_0_1px_rgba(47,52,59,0.06)]">
                  {item.mark}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-honey">
                Today Focus
              </p>
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-honey">
                2/5
              </span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold">函数条件转化</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              今天先修一个短板，别开全图战争。
            </p>
            <div className="mt-4 h-2.5 rounded-full bg-chalk">
              <div className="h-2.5 w-2/5 rounded-full bg-calculation" />
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          <header className="flex items-center justify-between gap-6 border-b border-ink/10 bg-white px-8 py-6">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-lagoon">
                AI Learning Studio
              </p>
              <h2 className="mt-2 font-display text-[28px] font-semibold tracking-tight">
                {page.title}
              </h2>
              <p className="mt-2 text-sm font-semibold text-ink/50">
                {page.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <label className="relative block">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30">
                  搜
                </span>
                <input
                  className="h-12 w-72 rounded-full border border-ink/10 bg-chalk pl-11 pr-4 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-review focus:bg-white"
                  placeholder="搜索错因、知识点、练习..."
                  type="search"
                />
              </label>
              <PrimaryButton to="/upload" variant="primary">
                上传错题
              </PrimaryButton>
              <AbilityMascot ability="review" size="avatar" />
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto bg-canvas px-8 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
