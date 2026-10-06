# WASA 개발자 인수인계

이 저장소의 **현재 운영 대상은 정적 React·Vite 사이트**입니다. API 서버, MySQL, 관리자 화면, 자체 인증은 실행하지 않습니다. 브랜드 입점 문의는 브라우저에서 Web3Forms로 직접 전송됩니다.

## 먼저 확인할 항목

| 주제 | 위치 | 핵심 내용 |
| --- | --- | --- |
| 설치·빌드·정적 배포 | [README.md](README.md) | `pnpm install`, `pnpm build`, `dist/public/` |
| 현재 아키텍처 | [docs/architecture.md](docs/architecture.md) | 정적 운영 경계와 외부 서비스 |
| 코드 탐색 | [docs/code-structure.md](docs/code-structure.md) | 주요 프런트엔드 파일과 자산 위치 |
| 환경변수 | [docs/environment-variables.md](docs/environment-variables.md) | 현재 필수 키와 선택 백엔드 변수 |
| AWS 정적 배포 | [docs/deploy-aws-lightsail.md](docs/deploy-aws-lightsail.md) | Ubuntu·Nginx·TLS·롤백 |
| 도메인·SEO 적용 | [docs/domain-activation.md](docs/domain-activation.md) | canonical·OG·sitemap·robots |
| 과거 선택 백엔드 | [docs/backend-api.md](docs/backend-api.md), [docs/database.md](docs/database.md) | 복구 참고용 API·DB 구조 |
| SQL DDL | [database/schema.sql](database/schema.sql) | 새 MySQL에 적용 가능한 과거 구조 |

## 빠른 시작

```bash
cp docs/environment.template .env.local
# .env.local에 VITE_WEB3FORMS_ACCESS_KEY를 설정
pnpm install --frozen-lockfile
pnpm check && pnpm test && pnpm build
```

`dist/public/`이 정적 배포 대상입니다. `dist/index.js`는 포트가 필요한 Node 호스팅에서만 사용하는 무상태 정적 파일 서버입니다.

## 운영 계정 인수

소스 이관만으로 운영이 완료되지는 않습니다. 회사가 다음 계정의 소유권·복구 수단을 보관해야 합니다.

1. Private GitHub Repository 및 CI 권한
2. Web3Forms 계정과 `contact@headless.co.kr` 수신 설정
3. 도메인 등록기관·DNS·호스팅 계정

비밀값, 문의 데이터, 데이터베이스 덤프는 이 저장소와 인수인계 ZIP에 포함하지 않습니다.
