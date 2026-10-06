# WASA 브랜드 허브

WASA는 로컬·스몰 브랜드가 고객과 만나는 공동 판로를 소개하고, 브랜드 입점 문의를 받는 단일 페이지 정적 웹사이트입니다. 이 저장소는 **React + Vite + Web3Forms + 프로젝트 내부 이미지 자산**만으로 동작합니다. 서버, 데이터베이스, 관리자 로그인, 플랫폼 전용 API는 런타임에 사용하지 않습니다.

## 기술 구조

| 영역 | 구성 |
| --- | --- |
| 프런트엔드 | React 19, TypeScript, Vite |
| 스타일·UI | Tailwind CSS 4, Radix UI, Framer Motion |
| 폼 | 브라우저에서 Web3Forms JSON API로 직접 전송 |
| 이미지 | `client/public/assets/wasa/`의 자체 보관 WebP·PNG |
| 호스팅 | 정적 파일 호스팅 — Cloudflare Pages, Vercel, Netlify, S3 + CloudFront, Nginx 호환 |
| 패키지 관리자 | pnpm 10 |

## 프로젝트 구조

```text
client/
  public/
    assets/wasa/          # 로고, 원본 WebP, 768px 파생본, 저화질 미리보기
    robots.txt
  src/
    components/           # 문의 폼·이미지 로딩·UI 컴포넌트
    lib/                  # 폼 검증, Web3Forms, 이미지/scroll-spy 매핑
    pages/Home.tsx        # 공개 랜딩 페이지
deployment/static/
  Dockerfile              # 외부 Docker 정적 배포용
  nginx.conf              # Nginx 정적 파일 설정
docs/
  domain-activation.md    # 도메인 확정 후 SEO URL 설정 절차
  environment.template    # 실제 값이 없는 환경변수 템플릿
CHANGELOG.md              # GitHub 릴리스 메모
```

## 로컬 실행

Node.js 22 이상과 pnpm 10을 사용합니다.

```bash
git clone <회사-Private-GitHub-저장소-URL>
cd wasa-brand-hub
cp docs/environment.template .env.local
# .env.local에 VITE_WEB3FORMS_ACCESS_KEY를 입력
corepack enable
pnpm install
pnpm dev
```

로컬 주소는 Vite가 표시하는 URL을 사용합니다. 공개 페이지는 `/`에서 확인할 수 있습니다.

## 검증과 프로덕션 빌드

```bash
pnpm check
pnpm test
pnpm build
```

정적 배포 산출물은 `dist/public/`에 생성됩니다. 이 폴더만 일반 정적 웹서버에 배포하면 됩니다. `dist/index.js`는 일부 Node.js 호스팅의 시작 규약을 지원하는 의존성 없는 정적 파일 서버 어댑터일 뿐이며, API·DB·인증을 제공하지 않습니다.

## 환경변수

| 변수 | 필수 | 용도 |
| --- | --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | 예 | Web3Forms 브라우저 직접 문의 전송에 사용하는 공개 Access Key |

Web3Forms Access Key는 프런트엔드 빌드 결과에 포함될 수 있는 공개 키입니다. 수신 주소와 Access Key 소유권은 회사 Web3Forms 계정에서 관리해야 합니다. API 비밀키, DB 접속정보, 개인 연락처가 들어간 백업 파일은 저장소에 커밋하지 않습니다.

환경변수 템플릿은 [`docs/environment.template`](docs/environment.template)에 있으며 실제 값은 저장소에 넣지 않습니다.

## Private GitHub 릴리스 준비

회사 소유 Private Repository를 만든 뒤, 이 저장소의 전체 내용을 최초 커밋합니다. `.gitignore`는 실제 환경변수, 로그, 빌드 산출물, 임시 데이터베이스 파일을 제외합니다.

```bash
git init
git add .
git commit -m "chore: initial static WASA handoff"
git tag -a v1.0.0-static -m "WASA independent static handoff"
git remote add origin <회사-Private-GitHub-저장소-URL>
git push -u origin main --tags
```

릴리스 전에는 `pnpm check`, `pnpm test`, `pnpm build`를 실행하고, 배포할 `dist/public/`을 기준으로 GitHub Release 또는 CI 배포를 만듭니다. 릴리스 메모 형식은 [`CHANGELOG.md`](CHANGELOG.md)를 따릅니다.

`.github/workflows/ci.yml`은 Pull Request, `main` 브랜치 push, `v*` 태그에서 설치·타입 검사·테스트·정적 빌드를 자동 검증합니다. Private Repository의 Actions 권한을 활성화한 뒤 사용합니다.

## 문의 폼

입점 문의는 `client/src/components/BrandInquiryForm.tsx`에서 클라이언트 측 검증과 honeypot 검사를 거친 뒤, `client/src/lib/web3forms.ts`가 `https://api.web3forms.com/submit`에 JSON으로 전송합니다. 성공 시 페이지 이동 없이 현재의 접수 완료 팝업이 표시됩니다.

이 정적 버전에는 문의를 자체 DB에 저장하거나 관리자 목록에 노출하는 기능이 없습니다. Web3Forms 계정에 연결된 `contact@headless.co.kr` 수신 흐름은 유지됩니다.

## 이미지 자산 관리

모든 WASA 이미지와 로고는 아래 폴더에 포함됩니다.

| 경로 | 용도 |
| --- | --- |
| `client/public/assets/wasa/images/` | 본문·갤러리·히어로용 고해상도 WebP |
| `client/public/assets/wasa/responsive/` | 768px 반응형 WebP |
| `client/public/assets/wasa/previews/` | 점진적 로딩용 저화질 미리보기 WebP |
| `client/public/assets/wasa/brand/` | WASA 공식 로고 |

이미지 경로 매핑은 `client/src/lib/wasaAssets.ts`, `wasaImagePreviews.ts`, `wasaResponsiveSources.ts`에서 관리합니다. 새 이미지에는 원본·768px 파생본·미리보기를 함께 추가하고, 해당 매핑과 테스트도 갱신합니다.

## 정적 호스팅 배포

모든 대상에서 공통으로 **Build command**는 `pnpm build`, **Output directory**는 `dist/public`입니다. 정적 파일 호스팅이므로 Node.js 런타임·MySQL·서버리스 함수는 필요하지 않습니다.

| 환경 | 핵심 설정 |
| --- | --- |
| Cloudflare Pages | Build command `pnpm build`, output `dist/public`, 환경변수에 `VITE_WEB3FORMS_ACCESS_KEY` 설정 |
| Vercel | Framework는 Vite, build command `pnpm build`, output `dist/public` |
| Netlify | Build command `pnpm build`, publish directory `dist/public` |
| AWS S3 + CloudFront | `dist/public/` 전체 업로드, CloudFront 기본 객체를 `index.html`로 지정 |
| 일반 Nginx | `dist/public/`을 웹 루트에 복사하고 `try_files $uri $uri/ /index.html` 설정 |

### Docker 기반 정적 배포

저장소 루트에서 다음 명령으로 별도 Nginx 정적 이미지를 만들 수 있습니다.

```bash
docker build \
  --build-arg VITE_WEB3FORMS_ACCESS_KEY="YOUR_WEB3FORMS_ACCESS_KEY" \
  -f deployment/static/Dockerfile \
  -t wasa-site .
docker run --rm -p 8080:80 wasa-site
```

`VITE_WEB3FORMS_ACCESS_KEY`는 Vite 빌드 시점에 주입되어야 합니다. CI에서는 회사 비밀 관리 기능을 사용해 build argument 또는 빌드 환경에만 전달합니다.

## 도메인 연결

도메인은 회사 소유의 등록기관·DNS 계정에서 관리합니다. 새 호스팅 사업자가 안내하는 A 또는 CNAME 레코드를 `www`와 루트 도메인에 적용하고, 한 가지 도메인을 대표 주소로 정한 뒤 다른 주소는 301 리디렉션합니다. TLS/HTTPS는 선택한 호스팅 사업자에서 활성화합니다.

도메인이 확정되기 전에는 URL이 필요한 SEO 메타데이터를 배포하지 않습니다. 확정 후 canonical, Open Graph URL, `sitemap.xml`, `robots.txt`를 한 번에 적용하는 절차와 템플릿은 [`docs/domain-activation.md`](docs/domain-activation.md)를 따릅니다.

## 기존 문의 데이터

정적 전환 전 존재하던 `brandInquiries` 4건은 개발·QA용 테스트 데이터였으며, 사용자의 확인에 따라 모두 삭제했습니다. 현재 남은 문의 데이터는 **0건**이며, 이 저장소에는 데이터베이스 덤프·개인정보·문의 내역이 포함되지 않습니다.

## 독립성 점검표

- [x] 레거시 외부 이미지 저장소 경로 참조 제거
- [x] 레거시 OAuth, tRPC, Express, MySQL, Drizzle, 알림 런타임 제거
- [x] 레거시 Vite 런타임과 분석 스크립트 제거
- [x] Web3Forms 직접 전송 유지
- [x] 자체 보관 WASA 이미지·로고 포함
- [x] 환경변수 템플릿, 정적 빌드, Docker/Nginx 배포 예시 포함

## 인수인계 주의사항

이 저장소는 정적 공개 홈페이지를 재현합니다. Web3Forms 계정과 DNS·도메인 계정의 소유권·복구 수단은 회사가 별도 보관·관리해야 합니다. 장애 시에는 마지막 Git 태그를 checkout하고, 환경변수를 다시 설정한 뒤 `pnpm install --frozen-lockfile && pnpm build`로 `dist/public/`을 재생성해 배포합니다.
