# 과거 migration 상태

과거 프로젝트의 `drizzle/migrations/`에는 실행 가능한 SQL migration이 없고 빈 디렉터리만 있었습니다. 따라서 복구용 기준은 상위의 [`../schema.sql`](../schema.sql)입니다.

새 백엔드 구현을 시작할 때부터는 Drizzle schema 변경마다 migration을 생성·검토·커밋하고, 실행 이력을 회사 운영 문서에 남깁니다.
