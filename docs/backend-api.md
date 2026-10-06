# 과거 선택 백엔드 API 구조

> 이 문서는 현재 운영 코드가 아닙니다. 정적 운영에는 API 서버가 없으며, 아래 내용은 향후 관리자 문의 기능을 복구할 때의 참고 기준입니다.

## 구성 요소

| 과거 파일 | 역할 |
| --- | --- |
| `server/_core/index.ts` | Express 생성, JSON body parser, `/api/trpc` 미들웨어 등록, 정적 파일 제공 |
| `server/routers.ts` | `appRouter`, 입력 Zod 스키마, 공개·관리자 절차 정의 |
| `server/inquiries.ts` | 문의 저장 후 소유자 알림을 구성하는 서비스 |
| `server/db.ts` | Drizzle MySQL 연결과 문의 생성·목록 조회 |
| `drizzle/schema.ts` | `users`, `brandInquiries` 테이블 타입 정의 |
| `client/src/pages/AdminInquiries.tsx` | 과거 관리자 문의 목록 화면 |

## tRPC 절차

| 절차 | 접근 | 입력 | 동작 |
| --- | --- | --- |
| `inquiry.create` | 공개 | 브랜드명, 담당자명, 연락처, 이메일, 소개, 문의, 동의, honeypot | honeypot이 비어 있으면 DB 저장·알림 실행 |
| `inquiry.list` | 관리자 | 없음 | 생성일 내림차순 문의 목록 반환 |
| `gallery.list` | 공개 | 없음 | 현장 갤러리 항목 반환 |
| `auth.me` | 공개 | 없음 | 현재 사용자 반환 |
| `auth.logout` | 공개 | 없음 | 세션 쿠키 제거 |

`inquiry.create`의 검증 조건은 브랜드명·담당자명·연락처·이메일·소개·문의의 필수 입력, 이메일 형식, 개인정보 동의 `true`, 선택 honeypot `website`입니다. 과거 구현은 입력 오류를 tRPC/Zod 오류로 반환했고, honeypot 입력은 저장·알림 없이 중립 응답을 반환했습니다.

## 복구 시 필수 변경

과거 관리자 인증과 소유자 알림은 외부 플랫폼 기능에 연결돼 있었습니다. 회사 소유 환경으로 복구할 때는 다음을 새로 구현합니다.

1. 관리자 로그인·역할 검증을 회사 인증 체계로 교체합니다.
2. 이메일 또는 알림 공급자를 회사 계정으로 선택합니다.
3. `/api/trpc`의 세션 보안, CORS, rate limit, 감사 로그를 적용합니다.
4. 개인정보 보유 기간·삭제·접근 권한 정책을 법무 기준에 맞춰 확정합니다.
