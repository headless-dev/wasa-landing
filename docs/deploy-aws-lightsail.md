# AWS Lightsail 정적 배포

이 가이드는 현재 정적 WASA 사이트를 Ubuntu, Nginx, HTTPS로 배포하는 절차입니다. Lightsail의 인스턴스·정적 IP·Nginx·TLS 기본 흐름은 AWS 공식 Nginx 안내를 참고합니다: [Nginx 인스턴스](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-nginx.html), [Let's Encrypt](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-using-lets-encrypt-certificates-with-nginx.html).

## 1. 인프라 생성

1. Lightsail에서 Ubuntu 인스턴스를 생성하고 Static IP를 연결합니다.
2. 방화벽에서 22, 80, 443을 열고 SSH 키 접근을 제한합니다.
3. 도메인이 확정되면 A 레코드를 Static IP로 연결합니다.

## 2. 서버 준비

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx curl certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo corepack prepare pnpm@10.4.1 --activate
node --version
pnpm --version
```

## 3. 빌드·배포

```bash
git clone <PRIVATE_REPOSITORY_URL> /opt/wasa-site
cd /opt/wasa-site
cp docs/environment.template .env.local
# VITE_WEB3FORMS_ACCESS_KEY를 설정
pnpm install --frozen-lockfile
pnpm check && pnpm test && pnpm build
sudo mkdir -p /var/www/wasa
sudo rsync -a --delete dist/public/ /var/www/wasa/
sudo chown -R www-data:www-data /var/www/wasa
```

`deployment/static/nginx.conf`를 `/etc/nginx/sites-available/wasa`로 복사하고 도메인·웹 루트를 수정합니다.

```bash
sudo cp deployment/static/nginx.conf /etc/nginx/sites-available/wasa
sudo sed -i 's/server_name _;/server_name example.com www.example.com;/' /etc/nginx/sites-available/wasa
sudo ln -s /etc/nginx/sites-available/wasa /etc/nginx/sites-enabled/wasa
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 4. HTTPS·재배포·복구

DNS가 전파된 뒤 TLS를 발급합니다.

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

재배포는 `git pull --ff-only`, 빌드, `rsync`, `nginx -t`, reload 순서입니다. 장애 시 마지막 태그를 checkout한 뒤 다시 빌드합니다.

```bash
git checkout v1.0.0-static
pnpm install --frozen-lockfile && pnpm build
sudo rsync -a --delete dist/public/ /var/www/wasa/
sudo nginx -t && sudo systemctl reload nginx
```

확인 로그는 `sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log`, 서비스 상태는 `sudo systemctl status nginx`입니다.
