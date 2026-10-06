# 환경변수

## 현재 정적 운영

| 변수 | 위치 | 필수 | 보안 | 예시 형식 | 용도 |
| --- | --- | --- | --- | --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | 프런트엔드 빌드 | 예 | 공개 Access Key | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | Web3Forms 브라우저 직접 문의 전송 |

`.env.local`은 로컬·CI 빌드 환경에만 둡니다. 템플릿은 [`environment.template`](environment.template)이며 실제 값은 commit하지 않습니다.

## 과거 선택 백엔드 복구

| 변수 | 위치 | 필수 | 보안 | 예시 형식 | 용도 |
| --- | --- | --- | --- | --- | --- |
| `DATABASE_URL` | 백엔드 | 예 | 비밀 | `mysql://USER:PASSWORD@HOST:3306/wasa_legacy` | MySQL 연결 |
| `JWT_SECRET` | 백엔드 | 예 | 비밀 | 32자 이상 임의 문자열 | 회사 인증 세션 서명용 |
| `PORT` | 백엔드 | 예 | 비밀 아님 | `3000` | Node 서버 리스닝 포트 |
| `NODE_ENV` | 백엔드 | 예 | 비밀 아님 | `production` | 프로덕션 모드 |

과거 외부 플랫폼 인증·알림 환경변수는 복구 대상이 아닙니다. 백엔드 재도입 시 회사가 선택한 인증·이메일·알림 서비스의 변수만 별도로 정의합니다.
