# 관리자 페이지 리팩토링 계획서

작성일: 2026-04-10
대상 프로젝트: `rumos`
범위: 관리자 페이지와 공개 페이지 간 데이터 소스 정합성 확보, 메인 / application / product / contact us 미구현 사항 점검 및 리팩토링 계획 수립

## 1. 배경

최근 커밋은 공개 사이트의 홈, 모바일 UI, 특허/자료실, 히어로 영역을 중심으로 계속 수정되었다.

- `d79fc51` Align mobile story highlight labels
- `27fc61c` Remove mobile gap before home series
- `3d4bbac` Refine mobile story highlight cards
- `3f25e2d` Force mobile patent pager below 720px
- `f0ff4be` Lower story content panel on desktop
- `69312e5` Improve mobile highlights and patent paging
- `89a77fb` Link hero detail button to Shinhotek
- `7f14f23` Adjust mobile story highlight layout

반면 관리자 페이지는 일부 고정 카피, 일부 DB 데이터, 일부 코드 하드코딩이 혼합된 상태라서 실제 운영자가 관리자에서 수정 가능한 범위와 공개 페이지에서 반영되는 범위가 일치하지 않는다.

이번 리팩토링의 목적은 다음과 같다.

1. 공개 페이지에서 노출되는 핵심 콘텐츠를 관리자에서 편집 가능하게 정리한다.
2. 하드코딩과 DB 관리 영역을 명확히 분리한다.
3. 메인, application, product, contact us 각 페이지별 미구현 항목을 도출하고 우선순위를 정한다.
4. 이후 기능 추가 시 소스 오브 트루스를 하나로 유지할 수 있는 구조로 정리한다.

## 2. 현재 관리자 구현 범위 요약

현재 관리자 라우트는 다음과 같다.

- `/asdasddfg/admin/home`
- `/asdasddfg/admin/applications`
- `/asdasddfg/admin/products`
- `/asdasddfg/admin/resources`
- `/asdasddfg/admin/inquiries`
- `/asdasddfg/admin/settings`

현재 편집 가능한 주요 데이터는 다음과 같다.

- 홈: 대표 이미지, 스토리 본문 일부, 시리즈 섹션 일부, SEO, 서브페이지 히어로
- applications: 항목별 제목/요약/이미지/정렬/노출 여부
- products: 목록/상세에 필요한 주요 필드 대부분
- resources: 자료실 CRUD
- inquiries: 문의 목록, 상태, 메일 회신

현재 편집이 불가능하거나 제한적인 주요 영역은 다음과 같다.

- 홈 hero 텍스트 카피
- 홈 story highlight 카드
- 홈 특허/인증 카드 및 모바일 페이징 관련 콘텐츠
- applications의 실제 공개 노출 필드와 관리자 필드 간 불일치
- products의 하드코딩된 목록/상세 설명, 스펙 참조 테이블
- contact us 본문 콘텐츠 전반

## 3. 페이지별 점검 결과

## 3.1 메인

관련 파일:

- `app/[locale]/page.tsx`
- `components/admin-home-tabs.tsx`
- `components/story-highlight-card.tsx`
- `components/patent-section.tsx`

현재 상태:

- 홈 hero는 관리자에서 이미지 정도만 관리하고, 주요 카피는 고정 문구다.
- story 섹션은 제목/본문/폰트 크기만 관리 가능하다.
- series 섹션은 타이틀, 리드, 일부 카드 이미지 정도만 수정 가능하다.
- 공개 홈에 있는 story highlight 카드, patent/certification 섹션은 관리자에서 관리되지 않는다.
- 최근 모바일 수정 사항은 CSS와 컴포넌트에 반영되어 있으나 관리자 구조에는 연결되지 않았다.

미구현/불일치 항목:

1. 홈 hero 타이틀, 설명, 버튼 텍스트, 보조 문구 편집 기능 부재
2. story highlight 카드 3종 데이터 편집 기능 부재
3. patent/certification 카드 데이터 편집 기능 부재
4. 시리즈 카드의 소개 문구, 키워드, 연결 링크가 코드 고정
5. 홈 개별 섹션 노출 순서 및 on/off 제어 없음

리팩토링 방향:

1. `SiteConfig` 확장 또는 홈 전용 섹션 모델 도입
2. `HomeHero`, `HomeStoryHighlightItem`, `HomePatentItem`, `HomeSeriesCardContent` 수준으로 데이터 구조 분리
3. 관리자 UI를 섹션 단위 탭이 아니라 "실제 공개 화면 구성 단위" 기준으로 재편

## 3.2 Application

관련 파일:

- `app/[locale]/applications/page.tsx`
- `components/admin-applications-tabs.tsx`
- `app/admin/actions.ts`

현재 상태:

- application 항목 생성/수정은 가능하다.
- 제목, 요약, 이미지, 정렬, 공개 여부는 저장된다.
- 관리자에서는 `bulletsKo`, `bulletsEn`까지 입력받지만 공개 페이지에서는 실질적으로 사용되지 않는다.
- 삭제 기능은 없다.
- 페이지 hero는 별도 서브히어로 설정에서만 관리된다.

미구현/불일치 항목:

1. 관리자 입력 필드 중 공개 페이지에서 미사용되는 필드 존재
2. application 삭제 기능 부재
3. application 목록 카드 레이아웃별 보조 문구, CTA, 세부 소개 연결 부족
4. 페이지 단위 SEO/구조화된 편집 흐름 미흡
5. 기본 fallback 데이터와 DB 데이터 merge 방식이 운영 관점에서 불명확

리팩토링 방향:

1. application 데이터 모델에서 실제 사용하는 필드만 유지하거나 공개 페이지에서 사용 범위를 확장
2. CRUD 완결성 확보: 생성/수정/삭제/정렬/노출
3. 공개 페이지 fallback 우선 구조를 제거하고 관리자 데이터 우선 구조로 통일
4. 페이지 hero 설정은 applications 관리자 내부에서도 접근 가능하도록 연결

## 3.3 Product

관련 파일:

- `app/[locale]/products/page.tsx`
- `app/[locale]/products/[slug]/page.tsx`
- `components/admin-products-tabs.tsx`

현재 상태:

- 관리자에서 제품 CRUD와 다국어 주요 필드는 비교적 폭넓게 관리 가능하다.
- 제품 목록/상세 히어로, 요약, 본문, features, specs, applications, SEO 등도 저장 가능하다.
- 그러나 공개 페이지는 여전히 코드 내부의 제품별 fallback 카피와 하드코딩 스펙 테이블에 크게 의존한다.

미구현/불일치 항목:

1. 제품 목록 설명이 코드 상수와 DB가 혼용됨
2. 제품 상세의 기술 스펙 테이블과 레퍼런스 데이터가 하드코딩
3. 상세 페이지 구성 섹션의 순서/노출 제어 없음
4. 제품 이미지 갤러리, 다운로드 자료 연결, 관련 application 연결이 제한적
5. 관리자에서 수정해도 일부 제품은 공개 페이지 하드코딩이 우선될 가능성 존재

리팩토링 방향:

1. 제품 상세를 코드 상수 기반에서 DB 기반으로 전환
2. 스펙/테이블/비디오/다운로드/관련 제품 같은 반복 섹션을 구조화
3. 제품별 커스텀 템플릿이 꼭 필요하면 "공통 필드 + 선택적 확장 블록" 구조로 설계
4. 목록/상세 모두 관리자 저장값이 우선되게 소스 오브 트루스 정리

## 3.4 Contact Us

관련 파일:

- `app/[locale]/contact/page.tsx`
- `app/[locale]/contact/quote/page.tsx`
- `app/[locale]/contact/distributors/page.tsx`
- `app/[locale]/contact/directions/page.tsx`
- `components/admin-page-hero-tabs.tsx`
- `components/admin-inquiries-tabs.tsx`

현재 상태:

- contact landing은 `/contact/quote`로 리다이렉트된다.
- 관리자에서는 contact 하위 페이지 hero만 일부 관리 가능하다.
- inquiries 탭은 문의 데이터와 회신 관리에 집중되어 있다.
- `quote`, `distributors`, `directions` 본문은 거의 전부 컴포넌트 내부 하드코딩이다.

미구현/불일치 항목:

1. contact quote의 문의 유형, 안내문, 직접 연락 정보 편집 기능 부재
2. distributors 페이지의 소개 문구, 지원 영역, placeholder 카드 편집 기능 부재
3. directions 페이지의 본문 정보, 주소/교통/안내 블록 편집 구조 부족
4. inquiries와 contact 콘텐츠 관리가 분리되지 않아 운영자 관점에서 흐름이 끊김
5. contact landing 자체를 별도 운영 페이지로 전환할 여지도 현재 구조에는 없음

리팩토링 방향:

1. "문의 접수 관리"와 "Contact Us 페이지 콘텐츠 관리"를 분리
2. `ContactPageContent` 또는 page slug 기반 content block 모델 도입
3. quote / distributors / directions를 각각 편집 가능한 섹션형 폼으로 구성
4. 향후 contact landing 도입 가능성을 고려해 공통 구조 설계

## 4. 공통 구조 문제

현재 관리자 전반에서 반복되는 구조적 문제는 다음과 같다.

1. 공개 페이지는 DB와 코드 fallback을 동시에 사용한다.
2. 관리자 폼 필드와 실제 렌더링 필드가 일치하지 않는다.
3. 섹션 단위 데이터 모델이 부족해 코드 하드코딩이 계속 남는다.
4. 페이지 hero 설정이 홈 관리자 내부 탭으로만 연결되어 접근성이 떨어진다.
5. 다국어 관리 정책이 페이지별로 일관되지 않다.

## 5. 제안 리팩토링 범위

## 5.1 1차

목표: 운영상 문제를 먼저 줄인다.

1. 메인, applications, products, contact us의 공개 노출 필드와 관리자 입력 필드 매핑표 작성
2. 관리자에서 입력되지만 공개 페이지에 미반영되는 필드 제거 또는 연결
3. applications 삭제 기능 추가
4. contact 콘텐츠 관리 메뉴 신설
5. page hero 설정 진입 구조 단순화

## 5.2 2차

목표: 코드 하드코딩을 관리자 데이터로 이전한다.

1. 홈 story highlight 카드 데이터 모델 추가
2. 홈 patent/certification 데이터 모델 추가
3. product 상세 스펙/자료/확장 섹션 구조화
4. contact quote / distributors / directions 본문 구조를 DB 관리형으로 전환

## 5.3 3차

목표: 운영 편의성과 확장성 확보

1. 섹션별 미리보기 제공
2. locale별 편집 completeness 표시
3. 게시 상태, 임시저장, 변경 이력 도입 검토
4. 관리자 메뉴 재구성 및 권한 분리 검토

## 6. 권장 데이터 모델 정리 방향

선택지 A: 기존 모델 확장

- `SiteConfig`에 홈 관련 필드 추가
- `PageHeroConfig` 유지
- `Application`, `Product`, `Resource` 유지
- contact 전용 필드 추가

장점:

- 빠르게 적용 가능
- 마이그레이션 충격이 작음

단점:

- 필드가 계속 비대해질 가능성 높음
- 섹션 반복 구조 표현이 불편함

선택지 B: 섹션형 콘텐츠 모델 도입

- 예: `ContentSection`, `ContentItem`, `PageSectionConfig`
- 페이지별 반복 섹션을 slug와 type으로 관리

장점:

- 홈 highlight, 특허, distributors 카드 같은 반복 구조 대응이 좋음
- 페이지 확장성이 높음

단점:

- 초기 설계와 관리자 UI 구현 비용이 큼
- 기존 코드 전환 범위가 넓음

현재 프로젝트에는 B2B 사이트 운영성과 향후 확장성을 고려하면, 완전 범용 CMS까지 갈 필요는 없지만 "페이지별 섹션 모델" 정도는 도입하는 편이 적절하다.

## 7. 우선 구현 제안

실행 순서는 다음이 적절하다.

1. 관리자/공개 페이지 매핑 정리
2. applications 삭제 및 필드 정리
3. contact 콘텐츠 관리 페이지 신설
4. 홈 highlight + patent 관리 기능 추가
5. product 상세 하드코딩 제거

이 순서를 권장하는 이유는 다음과 같다.

- 현재 운영상 가장 큰 공백은 contact 콘텐츠와 홈 반복 섹션이다.
- products는 영향 범위가 크기 때문에 구조 정리 후 단계적으로 옮기는 편이 안전하다.
- applications는 비교적 작은 범위라 빠르게 완결도를 올릴 수 있다.

## 8. 구현 산출물 제안

리팩토링 완료 시 최소 산출물은 다음과 같다.

1. 관리자 기능 명세서 업데이트
2. Prisma 스키마 변경안
3. 관리자 메뉴 및 탭 구조 개편
4. 공개 페이지에서 DB 우선 렌더링 구조 정리
5. 운영자 테스트 체크리스트

## 9. 다음 작업 제안

다음 단계에서는 아래 순서로 실제 구현에 들어간다.

1. 관리자/공개 페이지 필드 매핑표 문서화
2. contact us 콘텐츠 관리 페이지 추가
3. applications/products의 필드 불일치 정리
4. 홈 반복 섹션 데이터 모델 추가

---

이 문서는 현재 코드베이스 기준 1차 점검 결과이며, 이후 리팩토링 착수 시 실제 스키마 변경안과 화면 설계안으로 세분화한다.
