# 공식 도메인 활성화 절차

도메인이 확정되기 전에는 예시 URL을 코드에 넣지 않습니다. 아래 네 항목은 실제 대표 도메인(예: `https://www.example.com`)이 확정된 같은 릴리스에서 함께 적용합니다.

| 항목 | 수정 위치 | 적용 내용 |
| --- | --- | --- |
| Canonical URL | `client/index.html` | `<link rel="canonical" href="https://YOUR_DOMAIN/" />` |
| Open Graph URL | `client/index.html` | `<meta property="og:url" content="https://YOUR_DOMAIN/" />` |
| 사이트맵 | `client/public/sitemap.xml` | 절대 URL을 사용한 공개 페이지 목록 |
| Robots | `client/public/robots.txt` | `Sitemap: https://YOUR_DOMAIN/sitemap.xml` 한 줄 추가 |

## 권장 사이트맵 템플릿

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR_DOMAIN/</loc>
  </url>
</urlset>
```

대표 도메인을 한 개로 결정하고, 나머지 루트·`www` 주소는 301 리디렉션합니다. DNS와 TLS 인증서는 회사 소유 계정에서 관리합니다.
