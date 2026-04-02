# Rumos Site

루모스 공식 사이트와 관리자 페이지를 위한 Next.js + PostgreSQL + Prisma 기반 프로젝트입니다.

## 포함 범위

- 공개 사이트: 메인, 오시는 길, Applications, Products, Contact, 자료실
- 관리자: 메인 콘텐츠, 애플리케이션, 제품, 자료실, 문의 상태 관리
- DB: PostgreSQL
- 운영 대응: Docker, Nginx reverse proxy, SSL 배치 구조
- SEO: locale 라우팅, metadata, sitemap, robots

## 기술 스택

- Next.js App Router
- React
- Prisma
- PostgreSQL
- Nginx

## 로컬 실행

1. `.env.example`을 `.env`로 복사합니다.
2. 의존성을 설치합니다.
3. DB 스키마를 반영하고 시드를 넣습니다.
4. 개발 서버를 실행합니다.

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Docker 실행

```bash
docker compose up --build
```

앱 컨테이너는 `web`, DB는 `db`, SSL 종료용 프록시는 `nginx` 서비스로 구성되어 있습니다.

## SSL 적용

- `infra/nginx/certs/fullchain.pem`
- `infra/nginx/certs/privkey.pem`

위 경로에 실제 인증서를 배치하면 Nginx가 HTTPS를 종료합니다.
실서비스에서는 아래 둘 중 하나를 권장합니다.

1. AWS ALB/CloudFront + ACM으로 SSL 종료
2. EC2/Nginx + Let's Encrypt 인증서 자동 갱신

현재 저장소는 두 번째 방식도 수용할 수 있도록 Nginx 인증서 마운트 구조를 잡아둔 상태입니다.

## 관리자 접근

- URL: `/asdasddfg/admin`
- 보호 방식: HTTP Basic Auth
- 계정: `.env`의 `ADMIN_USERNAME`, `ADMIN_PASSWORD`

## 문의 이메일 연동

문의는 항상 DB에 저장됩니다.
SMTP 정보가 설정되어 있으면 관리자 수신 이메일로도 전송됩니다.

## SEO 메모

- 한국어/영어 locale prefix 라우팅
- `robots.txt`
- `sitemap.xml`
- 제품 상세 페이지별 개별 URL
- canonical 및 language alternates 기반 메타데이터
