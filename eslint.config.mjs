import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  // Next.js 기본 권장 규칙
  ...nextVitals,
  ...nextTs,

  // 공통 규칙 (전체 파일에 적용)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 포맷은 Prettier가 담당
      'prettier/prettier': 'warn',

      // axios 런타임 직접 import 금지
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'axios',
              message: 'axios 직접 import 금지. axiosInstance를 사용하세요.',
            },
          ],
        },
      ],

      // 팀 기준 규칙
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // 🔥 errors.ts 전용 예외 규칙
  {
    files: ['src/shared/apis/errors.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // Prettier 충돌 규칙 비활성화
  prettier,

  // 전역 ignore
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
