# 아키텍처

## 현재 운영 구조

```text
방문자 브라우저
  └─ React 19 + Vite 정적 파일
       ├─ /assets/wasa/* (저장소 내부 로고·WebP 자산)
       └─ Web3Forms JSON API (입점 문의 직접 전송)
            └─ contact@headless.co.kr
```

현재 운영은 **정적 파일 호스팅만 필요**합니다. MySQL, Node API, 관리자 인증, 서버리스 함수, 파일 프록시는 실행하지 않습니다. `VITE_WEB3FORMS_ACCESS_KEY`는 Vite 빌드 시 클라이언트 번들에 포함되는 공개 Access Key입니다.

| 현재 패키지 | `package.json` 버전 범위 |
| --- | --- |
| React / React DOM | `^19.2.1` / `^19.2.1` |
| TypeScript | `5.9.3` |
| Vite | `^7.1.7` |
| Tailwind CSS | `^4.1.14` |
| Wouter | `^3.3.5` |
| pnpm | `10.4.1` |
| 권장 Node.js | `22.x` |

현재 UI는 Radix UI, Framer Motion, Zod, React Hook Form을 포함하지만, 런타임 서버 의존성은 없습니다.

## 과거 선택 백엔드 구조

과거 구현은 Node.js·Express·tRPC·Drizzle ORM·MySQL로 문의 저장과 관리자 목록을 제공했습니다. 이 구조는 현재 빌드에 포함하지 않으며, 확장 또는 복구가 필요할 때만 [backend-api.md](backend-api.md), [database.md](database.md), [database/schema.sql](../database/schema.sql)을 기준으로 별도 서비스를 만듭니다.

| 과거 선택 패키지 | 당시 `package.json` 버전 범위 |
| --- | --- |
| Express | `^4.21.2` |
| tRPC client/react-query/server | `^11.6.0` |
| Drizzle ORM / Kit | `^0.44.5` / `^0.31.4` |
| MySQL2 | `^3.15.0` |
| TSX | `^4.19.1` |
| Vite runtime plugin | `0.0.59` |

```text
Nginx → Node.js/Express → /api/trpc → tRPC Router → Drizzle ORM → MySQL
```

과거 인증 흐름은 외부 플랫폼 계정에 결합돼 있었으므로, 백엔드 복구 시 회사 소유 인증 체계(예: 자체 관리자 세션 또는 OAuth 공급자)로 교체해야 합니다.
