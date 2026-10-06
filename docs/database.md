# 과거 선택 MySQL 데이터베이스

> 현재 운영 사이트는 MySQL을 사용하지 않습니다. 이 문서는 과거 관리자 문의 기능을 별도 백엔드로 복구할 때의 스키마 기준입니다. 실제 문의 데이터는 포함하지 않습니다.

## `users`

| 컬럼 | 타입 | Null | 기본값 | 키·인덱스 | 설명 |
| --- | --- | --- | --- | --- | --- |
| `id` | `INT` | 아니오 | AUTO_INCREMENT | PK | 내부 사용자 식별자 |
| `openId` | `VARCHAR(64)` | 아니오 | 없음 | UNIQUE | 과거 외부 인증 식별자 |
| `name` | `TEXT` | 예 | 없음 | 없음 | 표시 이름 |
| `email` | `VARCHAR(320)` | 예 | 없음 | 없음 | 사용자 이메일 |
| `loginMethod` | `VARCHAR(64)` | 예 | 없음 | 없음 | 로그인 방식 |
| `role` | `ENUM('user','admin')` | 아니오 | `user` | 없음 | 관리자 권한 구분 |
| `createdAt` | `TIMESTAMP` | 아니오 | 현재 시각 | 없음 | 생성 시각 |
| `updatedAt` | `TIMESTAMP` | 아니오 | 현재 시각·갱신 | 없음 | 수정 시각 |
| `lastSignedIn` | `TIMESTAMP` | 아니오 | 현재 시각 | 없음 | 마지막 로그인 시각 |

`brandInquiries`와의 외래 키는 없었습니다.

## `brandInquiries`

| 컬럼 | 타입 | Null | 기본값 | 키·인덱스 | 설명 |
| --- | --- | --- | --- | --- | --- |
| `id` | `INT` | 아니오 | AUTO_INCREMENT | PK | 문의 식별자 |
| `brandName` | `VARCHAR(200)` | 아니오 | 없음 | 없음 | 브랜드명 |
| `contactName` | `VARCHAR(100)` | 아니오 | 없음 | 없음 | 담당자명 |
| `phone` | `VARCHAR(30)` | 아니오 | 없음 | 없음 | 연락처 |
| `email` | `VARCHAR(320)` | 아니오 | 없음 | 없음 | 회신 이메일 |
| `brandIntroduction` | `TEXT` | 아니오 | 없음 | 없음 | 브랜드 소개 또는 링크 |
| `inquiryMessage` | `VARCHAR(5000)` | 아니오 | 빈 문자열 | 없음 | 문의 내용 |
| `privacyConsent` | `BOOLEAN` | 아니오 | `false` | 없음 | 개인정보 동의 여부 |
| `privacyConsentAt` | `TIMESTAMP` | 예 | 없음 | 없음 | 동의 시각 |
| `createdAt` | `TIMESTAMP` | 아니오 | 현재 시각 | 없음 | 문의 생성 시각 |

과거 스키마에 추가 외래 키·보조 인덱스·유니크 제약은 없었습니다. 데이터 보관·삭제 정책은 복구 전 회사 정책으로 재정의해야 합니다.
