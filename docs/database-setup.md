# 과거 선택 DB 설정·복구

현재 정적 사이트에는 이 절차가 필요 없습니다. 관리자 문의 저장을 복구할 때만 실행합니다.

1. MySQL 8 계열 또는 호환 서비스를 준비하고 비공개 네트워크에서 접근하게 합니다.
2. 회사 전용 DB 사용자와 강한 비밀번호를 생성합니다.
3. [`database/schema.sql`](../database/schema.sql)을 적용합니다.
4. 서버 환경에 `DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/wasa_legacy`를 설정합니다.
5. Drizzle 기반 서버를 별도 프로젝트로 복구한 뒤 DB 연결·문의 생성·관리자 인증 테스트를 수행합니다.

```bash
mysql -u root -p < database/schema.sql
mysql -h HOST -u wasa_app -p wasa_legacy -e "SHOW TABLES;"
```

과거 Git 이력에는 실행 가능한 Drizzle SQL migration 파일이 없고 빈 migration 디렉터리만 있었습니다. 따라서 현재 참고 DDL이 기준이며, 새 백엔드에서 schema 변경을 시작하면 새 migration을 생성·커밋합니다.
