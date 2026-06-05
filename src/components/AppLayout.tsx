import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AbilityMascot from './AbilityMascot';
import PrimaryButton from './PrimaryButton';
import { useLanguage } from '../i18n/LanguageContext';

const navItems = [
  { key: 'nav.today', path: '/', mark: '今', enMark: 'T' },
  { key: 'nav.upload', path: '/upload', mark: '传', enMark: 'U' },
  { key: 'nav.errors', path: '/mistakes', mark: '错', enMark: 'E' },
  { key: 'nav.practice', path: '/practice', mark: '练', enMark: 'P' },
  { key: 'nav.progress', path: '/abilities', mark: '进', enMark: 'G' },
  { key: 'nav.plan', path: '/plan', mark: '排', enMark: 'L' },
];

export default function AppLayout() {
  const location = useLocation();
  const { language, isEnglish, t, toggleLanguage } = useLanguage();
  const isHome = location.pathname === '/' || location.pathname === '/dashboard';
  const diagnosisMode = new URLSearchParams(location.search).get('mode');
  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/': {
      title: t('layout.homeTitle'),
      subtitle: t('layout.homeSubtitle'),
    },
    '/dashboard': {
      title: t('layout.homeTitle'),
      subtitle: t('layout.homeSubtitle'),
    },
    '/upload': {
      title: t('layout.uploadTitle'),
      subtitle: t('layout.uploadSubtitle'),
    },
    '/diagnosis': {
      title:
        diagnosisMode === 'ai'
          ? t('layout.systemDiagnosisTitle')
          : t('layout.diagnosisTitle'),
      subtitle:
        diagnosisMode === 'ai'
          ? t('layout.systemDiagnosisSubtitle')
          : t('layout.diagnosisSubtitle'),
    },
    '/mistakes': {
      title: t('layout.mistakesTitle'),
      subtitle: t('layout.mistakesSubtitle'),
    },
    '/practice': {
      title: t('layout.practiceTitle'),
      subtitle: t('layout.practiceSubtitle'),
    },
    '/ability': {
      title: t('layout.progressTitle'),
      subtitle: t('layout.progressSubtitle'),
    },
    '/abilities': {
      title: t('layout.progressTitle'),
      subtitle: t('layout.progressSubtitle'),
    },
    '/plan': {
      title: t('layout.planTitle'),
      subtitle: t('layout.planSubtitle'),
    },
  };
  const page =
    pageTitles[location.pathname] ??
    (location.pathname.startsWith('/mistakes/')
      ? { title: t('layout.detailTitle'), subtitle: t('layout.detailSubtitle') }
      : pageTitles['/']);

  return (
    <div className={`h-screen overflow-hidden bg-learning-field bg-soft-grid bg-[length:auto,32px_32px] p-4 text-ink lang-${language}`}>
      <div className="mx-auto flex h-[calc(100vh-32px)] max-w-[1360px] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-[0_16px_42px_rgba(47,52,59,0.05)]">
        <aside className="h-full w-[220px] shrink-0 overflow-hidden border-r border-ink/8 bg-[#FBFCFD] px-4 py-5">
          <div className="rounded-[1.25rem] border border-ink/8 bg-white p-4">
            <div className="flex items-center gap-3">
              <AbilityMascot ability="reading" size="avatar" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/38">
                  {t('common.appKicker')}
                </p>
                <h1 className="mt-1 text-lg font-semibold leading-tight">
                  {t('common.appName')}
                </h1>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-ink/48">
              {t('common.appDesc')}
            </p>
          </div>

          <nav className="mt-5 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => {
                  const isDashboardHome =
                    item.path === '/' && location.pathname === '/dashboard';
                  const active = isActive || isDashboardHome;

                  return `group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? 'border-calculation/30 bg-calculationSoft text-ink shadow-[0_6px_18px_rgba(47,52,59,0.04)]'
                      : 'border-transparent bg-transparent text-ink/42 hover:border-ink/8 hover:bg-white hover:text-ink/70'
                  }`;
                }}
                end={item.path === '/'}
                key={item.path}
                to={item.path}
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-medium text-ink/55 shadow-[inset_0_0_0_1px_rgba(47,52,59,0.06)]">
                  {isEnglish ? item.enMark : item.mark}
                </span>
                <span className="min-w-0 break-words">{t(item.key)}</span>
              </NavLink>
            ))}
          </nav>

          {isHome ? (
            <div className="mt-6 rounded-[1.25rem] border border-ink/8 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">
                  {t('layout.todayFocus')}
                </p>
                <span className="rounded-full bg-accent-warning px-2.5 py-1 text-xs font-medium text-ink/70">
                  2/5
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-chalk">
                <div className="h-2 w-2/5 rounded-full bg-calculation" />
              </div>
            </div>
          ) : null}
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          <header className="flex items-center justify-between gap-5 border-b border-ink/8 bg-white px-7 py-5">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink/38">
                {t('common.studio')}
              </p>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
                {page.title}
              </h2>
              <p className="mt-1 text-sm font-normal text-ink/50">
                {page.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <label className="relative hidden xl:block">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/28">
                  {t('common.searchShort')}
                </span>
                <input
                  className="h-11 w-60 rounded-full border border-ink/8 bg-chalk pl-10 pr-4 text-sm font-normal text-ink outline-none transition placeholder:text-ink/32 focus:border-calculation focus:bg-white xl:w-64"
                  placeholder={t('common.search')}
                  type="search"
                />
              </label>
              <button
                aria-label="Switch language"
                className="inline-flex h-11 min-w-12 items-center justify-center rounded-full border border-ink/10 bg-white px-4 text-sm font-medium text-ink/60 shadow-[0_4px_14px_rgba(47,52,59,0.035)] transition hover:bg-chalk hover:text-ink"
                onClick={toggleLanguage}
                type="button"
              >
                {isEnglish ? '中' : 'EN'}
              </button>
              <PrimaryButton to="/upload">{t('common.uploadMistake')}</PrimaryButton>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-canvas px-7 py-7">
            <div className="mx-auto w-full max-w-[1120px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
