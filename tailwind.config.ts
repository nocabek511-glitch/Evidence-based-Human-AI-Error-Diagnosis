import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          background: '#FFFEFC',
          card: '#FFFFFF',
          border: '#E8E6E1',
          textPrimary: '#2F343B',
          textSecondary: '#6B7280',
          textMuted: '#9CA3AF',
        },
        accent: {
          focus: '#F4E9FF',
          warning: '#FFF1CB',
          action: '#E0FCF6',
        },
        ability: {
          reading: '#F5B1B2',
          translation: '#E2CDF7',
          model: '#FFD997',
          method: '#C8E3A5',
          calculation: '#9BD1C5',
          review: '#ABC5EF',
        },
        abilityTint: {
          reading: '#FFE5E5',
          translation: '#F4E9FF',
          model: '#FFF1CB',
          method: '#F1FFDE',
          calculation: '#E0FCF6',
          review: '#E1E8FF',
        },
        ink: '#2F343B',
        paper: '#FFFFFF',
        canvas: '#FFFEFC',
        chalk: '#F7F7F5',
        line: '#E8E6E1',

        // Ability IP primary colors.
        reading: '#F5B1B2',
        translation: '#E2CDF7',
        modeling: '#FFD997',
        method: '#C8E3A5',
        calculation: '#9BD1C5',
        review: '#ABC5EF',

        // Soft section colors from the IP system.
        readingSoft: '#FFE5E5',
        translationSoft: '#F4E9FF',
        modelingSoft: '#FFF1CB',
        methodSoft: '#F1FFDE',
        calculationSoft: '#E0FCF6',
        reviewSoft: '#E1E8FF',

        // Backward-compatible semantic aliases mapped to the same Morandi system.
        cream: '#FFF1CB',
        meadow: '#F1FFDE',
        mist: '#E1E8FF',
        lavender: '#F4E9FF',
        peach: '#F5B1B2',
        coral: '#2F343B',
        sun: '#FFD997',
        honey: '#2F343B',
        grass: '#9BD1C5',
        leaf: '#2F343B',
        sky: '#ABC5EF',
        lagoon: '#2F343B',
        berry: '#E2CDF7',
      },
      boxShadow: {
        soft: '0 18px 48px rgba(47, 52, 59, 0.06)',
        card: '0 8px 24px rgba(15, 23, 42, 0.04)',
        button:
          '0 2px 0 rgba(47, 52, 59, 0.06), 0 8px 14px rgba(47, 52, 59, 0.05)',
        'button-hover':
          '0 1px 0 rgba(47, 52, 59, 0.05), 0 6px 12px rgba(47, 52, 59, 0.045)',
      },
      fontFamily: {
        display: [
          'Source Han Sans SC',
          'Noto Sans CJK SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        sans: [
          'Source Han Sans SC',
          'Noto Sans CJK SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'learning-field':
          'radial-gradient(circle at 10% 8%, rgba(226,205,247,0.12), transparent 26%), radial-gradient(circle at 92% 6%, rgba(171,197,239,0.12), transparent 24%), linear-gradient(135deg, #ffffff 0%, #fffefc 52%, #f9fafb 100%)',
        'soft-grid':
          'linear-gradient(rgba(47,52,59,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(47,52,59,0.022) 1px, transparent 1px)',
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        'pop-in': 'pop-in 360ms cubic-bezier(.2,.9,.25,1.25) both',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
