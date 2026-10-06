# AWS Lightsail 선택 백엔드·MySQL 복구

> 현재 운영 사이트에는 적용하지 않습니다. 관리자 문의 저장을 회사 소유 인프라로 재도입할 때만 사용하는 설계 가이드입니다.

## 목표 구조

```text
DNS → Lightsail Static IP → Nginx (TLS)
  ├─ 정적 React 파일
  └─ /api/ → Node.js + Express + tRPC → MySQL
```

## 구축 순서

1. 정적 배포 가이드와 같이 Ubuntu, Static IP, DNS, Nginx, TLS를 준비합니다.
2. MySQL은 별도 비공개 인스턴스 또는 관리형 DB에 생성하고 외부 공개 접속을 차단합니다.
3. DB 관리자에서 `wasa_legacy` DB와 최소 권한의 `wasa_app` 사용자를 만듭니다.
4. `mysql -u root -p < database/schema.sql`로 과거 구조를 생성합니다.
5. 별도 Node 서비스에 `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `PORT`를 비밀 관리 방식으로 주입합니다.
6. 회사 소유 인증과 이메일·알림 공급자를 구현한 뒤 문의 생성·관리자 목록 권한을 테스트합니다.
7. systemd 또는 컨테이너로 Node 프로세스를 실행하고, Nginx의 `/api/`를 내부 포트로 reverse proxy 합니다.

과거 Drizzle 기반 개발 패키지를 별도 백엔드 저장소에 설치한 뒤 스키마 변경 시 아래와 같이 migration을 새로 관리합니다.

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

## 운영·백업

DB 백업은 MySQL 사용자와 백업 파일을 암호화한 회사 저장소에 보관합니다. 복구는 새 DB에 schema 적용 후 `mysql` import, 앱 health check, 관리자 권한 점검 순서로 진행합니다. 개인정보가 포함된 dump는 Git, CI 로그, 공개 스토리지에 두지 않습니다.

과거 migration SQL은 존재하지 않았습니다. 새 백엔드를 시작할 때 Drizzle schema와 migration 생성 절차를 새 저장소에서 관리합니다.
