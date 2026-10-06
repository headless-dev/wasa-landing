# 코드 구조

| 경로 | 역할 |
| --- | --- |
| `client/src/main.tsx` | React 시작점 |
| `client/src/App.tsx` | 공개 랜딩 페이지 라우팅 |
| `client/src/pages/Home.tsx` | 모든 랜딩 섹션·모바일 메뉴·scroll spy·CTA |
| `client/src/components/BrandInquiryForm.tsx` | 입점 문의 UI, 필드 검증, 성공·실패 상태 |
| `client/src/lib/web3forms.ts` | Web3Forms JSON 직접 전송 |
| `client/src/lib/brandInquiryValidation.ts` | 문의 폼 Zod 검증 |
| `client/src/lib/wasaAssets.ts` | 자체 보관 자산 경로 상수 |
| `client/src/lib/wasaImagePreviews.ts` | 저화질 미리보기 매핑 |
| `client/src/lib/wasaResponsiveSources.ts` | 반응형 `srcset` 매핑 |
| `client/src/lib/scrollSpy.ts` | 메뉴 활성 상태 계산 |
| `client/src/index.css` | 전역 디자인 토큰·반응형·모션 |
| `client/public/assets/wasa/` | 로고, 원본 WebP, 768px 파생본, 미리보기 |
| `deployment/static/` | Nginx 기반 Docker 배포 예시 |
| `scripts/build-static-server.mjs` | `dist/index.js` 정적 파일 서버 생성 |

새 이미지는 `images/`, `responsive/`, `previews/`에 각각 추가하고 자산 매핑과 단위 테스트를 갱신합니다. 현재 자산 수는 62개입니다.
