# AI기반 팀 관리 및 성과 매니지먼트

효성 인재상 기반의 성과관리, KPI, 1:1 코칭, DISC 행동유형 지식을 한 곳에 정리한 GitHub Pages 웹사이트입니다. 이 사이트는 Microsoft 365 Copilot의 Agent Builder에서 Knowledge URL로 등록해 사용할 수 있도록 구성했습니다.

- 배포 사이트: <https://sesme100.github.io/Performance-Management/>
- KPI 예시 테이블: <https://sesme100.github.io/Performance-Management/kpi-playground/>
- 저장소: <https://github.com/sesme100/Performance-Management>

## 목적

이 프로젝트는 팀장과 평가자가 성과관리 과정에서 반복적으로 참고하는 자료를 웹 기반 Knowledge Hub로 정리합니다.

- 효성 인재상과 Hyosung Way를 성과관리 언어로 재구성
- 성과평가 체계, KPI 작성, 중간 리뷰, 피드백, 코칭 흐름 정리
- 영업, 생산, 연구, 재무 부서별 KPI 예시 제공
- Copilot Agent Builder가 참고할 수 있는 Knowledge 페이지 구성
- 평가자가 실제 KPI 엑셀을 내려받아 수정하고 Copilot Agent에 업로드할 수 있는 사용 흐름 제공

## 주요 페이지

| 페이지 | 설명 |
| --- | --- |
| 전체 목차 | 성과관리 Knowledge Hub의 전체 구조와 이동 경로를 제공합니다. |
| 효성 인재상 | 효성 Way, 핵심 가치, 평가 행동 예시를 정리합니다. |
| 성과평가 체계 | 목표 설정, 성과 점검, 평가, 피드백의 흐름을 설명합니다. |
| KPI 예시 테이블 | 영업, 생산, 연구, 재무 KPI 예시를 웹에서 확인하고 일부 값을 수정해 계산할 수 있습니다. |
| KPI Agent Knowledge | Copilot Agent가 KPI를 해석할 때 참고할 수 있는 지식 구조를 제공합니다. |
| 1:1 코칭 | 팀장과 구성원의 성과 대화, 코칭 질문, 피드백 방향을 정리합니다. |
| DISC 행동유형 | DISC 유형별 커뮤니케이션 및 코칭 포인트를 제공합니다. |
| Agent Builder Knowledge | M365 Copilot Agent Builder에 Knowledge로 등록할 때의 활용 가이드를 제공합니다. |

## KPI 예시 테이블 기능

`/kpi-playground/` 페이지는 업로드한 원본 Excel 자료를 기반으로 구성한 KPI 실습 페이지입니다.

- 원본 Excel 다운로드 제공
- 영업, 생산, 연구, 재무 4개 부서 KPI 예시 테이블 제공
- 금년계획, 달성실적 등 파란색 입력칸 수정 가능
- 계획대비 달성률, 실적 점수, 부서별 평균 실적 자동 계산
- 부서별 KPI Excel 다운로드 지원
- Copilot Agent에 엑셀을 업로드해 성과평가 초안을 요청하는 예시 프롬프트 제공

## Copilot Agent Builder 활용 방식

1. 배포 사이트 URL을 Copilot Agent Builder의 Knowledge로 등록합니다.
2. 평가자는 KPI 예시 테이블에서 원본 또는 부서별 Excel을 다운로드합니다.
3. 실제 평가 대상자 또는 부서의 KPI 값으로 Excel을 수정합니다.
4. 수정한 Excel 파일을 Copilot Agent 대화에 업로드합니다.
5. Agent에게 부서명, 평가 대상자, 평가 목적, 원하는 출력 형식을 함께 입력합니다.
6. Agent가 작성한 결과는 초안으로 활용하고, 최종 평가는 공식 HR 기준과 실제 행동 사례를 기준으로 검토합니다.

## 기술 구성

- 정적 사이트 생성기: Jekyll
- 기반 테마: Feeling Responsive
- 배포: GitHub Pages, GitHub Actions
- 스타일: `assets/css/performance-hub.css`
- KPI 데이터: `_data/kpi_examples.yml`
- KPI 계산 및 Excel 다운로드: `assets/js/kpi-playground.js`
- 주요 레이아웃: `_layouts/page-fullwidth.html`, `_layouts/default.html`

## 로컬 실행

Ruby와 Bundler가 설치된 환경에서 실행합니다.

```powershell
bundle install
bundle exec jekyll serve
```

로컬 사이트 주소:

```text
http://127.0.0.1:4000/Performance-Management/
```

정적 빌드 확인:

```powershell
bundle exec jekyll build
```

## 배포

`gh-pages` 브랜치에 변경사항을 push하면 GitHub Actions가 Jekyll 사이트를 빌드하고 GitHub Pages로 배포합니다.

```powershell
git add .
git commit -m "Update performance management knowledge hub"
git push origin gh-pages
```

배포 후 사이트는 아래 주소에서 확인할 수 있습니다.

```text
https://sesme100.github.io/Performance-Management/
```

## 참고

이 저장소는 원래 Jekyll 테마인 Feeling Responsive를 기반으로 시작했지만, 현재는 효성 성과관리와 M365 Copilot Agent Builder Knowledge 활용 목적에 맞게 콘텐츠, 네비게이션, 스타일, KPI 기능을 커스터마이징한 프로젝트입니다.
