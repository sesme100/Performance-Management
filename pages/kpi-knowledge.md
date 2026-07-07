---
layout: page-fullwidth
title: "KPI Agent Knowledge"
subheadline: "Static KPI Reference for Agent Builder"
teaser: "M365 Copilot Agent Builder가 참조할 수 있도록 원본 엑셀 기반 KPI 산식과 영업·생산·연구·재무 예시 데이터를 정적 문서로 제공합니다."
permalink: "/kpi-knowledge/"
---

<!-- markdownlint-disable MD010 MD022 MD033 MD060 -->

## 이 페이지의 역할

이 페이지는 Agent Builder Knowledge가 읽기 위한 정적 KPI 참조 문서입니다. [KPI 예시 테이블]({{ '/kpi-playground/' | relative_url }})은 사람이 값을 바꾸고 개인별 파일을 다운로드하는 화면이고, 이 페이지는 Agent가 KPI 기준과 기본 예시 데이터를 안정적으로 검색하도록 만든 문서입니다.

KPI 항목과 기본값은 업로드한 원본 엑셀 `assets/downloads/효성인력개발원_KPI 구성요소_0702_Value.xlsx`에서 가져온 영업, 생산, 연구, 재무 예시를 기준으로 하며, 사이트 데이터는 `_data/kpi_examples.yml`에서 관리합니다. KPI 원본이 바뀌면 원본 파일과 `_data/kpi_examples.yml`을 함께 갱신하고 사이트를 다시 빌드해야 Agent가 최신 기준을 참조할 수 있습니다.

## KPI 계산 산식

| 항목 | 산식 | 설명 |
|---|---|---|
| 높을수록 좋은 지표 계획대비 달성률 | 달성실적 / 금년계획 | 매출, 생산량, 만족도처럼 값이 클수록 좋은 KPI에 사용합니다 |
| 낮을수록 좋은 지표 계획대비 달성률 | 금년계획 / 달성실적 | Waste율, 여신잔액, 원단위처럼 값이 작을수록 좋은 KPI에 사용합니다 |
| 실적 | 계획대비 달성률 * 100 | 원본 엑셀의 `실적` 열 표현과 맞춥니다 |
| 부서별 평균 실적 | Σ(실적 * 가중치) / Σ가중치 | 각 부서 표 안에서만 가중 평균합니다 |

## 판정 기준

| 실적 | 판정 | Agent 답변 방향 |
|---:|---|---|
| 105 이상 | 기대 이상 | 성공 요인, 재현 가능성, 확산 기회를 제안합니다 |
| 95 이상 | 기대 충족 | 강점과 목표 달성 과정을 구체화합니다 |
| 85 이상 | 보완 필요 | 미달 원인과 지원 필요사항을 균형 있게 확인합니다 |
| 85 미만 | 집중 개선 필요 | 원인, 실행계획, 점검주기, 지원 방식을 구체화합니다 |

## KPI 기본 데이터: 영업, 생산, 연구, 재무

{% for department in site.data.kpi_examples.departments %}
### {{ department.title }}

<table>
	<thead>
		<tr>
			{% for header in site.data.kpi_examples.headers %}<th>{{ header }}</th>{% endfor %}
		</tr>
	</thead>
	<tbody>
	{% for row in department.rows %}
		<tr>
			<td>{{ row.category }}</td>
			<td>{{ row.task }}</td>
			<td>{{ row.action }}</td>
			<td>{{ row.weight }}</td>
			<td>{{ row.schedule }}</td>
			<td>{{ row.kpi }}</td>
			<td>{{ row.unit }}</td>
			<td>{{ row.previous }}</td>
			<td>{{ row.plan }}</td>
			<td>{{ row.actual }}</td>
			<td>{{ row.achievement }}</td>
			<td>{{ row.score }}</td>
			<td>{{ row.comment }}</td>
		</tr>
	{% endfor %}
	</tbody>
</table>

{% endfor %}

## KPI별 평가 해석과 코칭 질문

Agent는 각 KPI를 해석할 때 다음 관점을 함께 사용합니다.

* 목표와 실적의 차이가 발생한 원인을 업무 행동, 외부 조건, 지원 필요사항으로 나누어 확인합니다.
* `잘한점/보완점` 열은 평가 코멘트의 초안으로 활용하되, 사용자가 제공한 실제 사례와 면담 기록을 우선합니다.
* 효성 Way의 최고, 혁신, 책임, 신뢰 관점 중 해당 KPI와 가장 관련 높은 관점을 연결합니다.
* 실적이 낮은 KPI는 비난보다 다음 행동, 점검 주기, 필요한 지원을 묻는 코칭 질문으로 전환합니다.

## Agent Builder 활용 지침

Agent는 KPI 데이터를 답변할 때 다음 순서로 사용합니다.

1. 사용자가 제공한 최신 KPI 값이 있으면 그 값을 우선합니다.
2. 사용자가 [KPI 예시 테이블]({{ '/kpi-playground/' | relative_url }})에서 원본 엑셀을 다운로드해 개인 KPI 값으로 수정한 뒤 업로드하면 그 파일을 우선합니다.
3. 계산은 이 페이지의 산식을 따릅니다.
4. 사용자가 최신 값을 제공하지 않으면 이 페이지의 기본 KPI 데이터를 예시로 사용합니다.
5. 평가 코멘트는 판정만 말하지 않고 금년계획, 달성실적, 계획대비 달성률, 실적, 효성 Way, 코칭 질문을 함께 연결합니다.
6. 브라우저에서 사용자가 수정한 KPI 값은 Knowledge에 자동 저장되지 않으므로, 최신 값이 필요한 경우 원본 엑셀을 내려받아 수정한 파일을 Agent에 업로드해야 합니다.

## Agent 질문 예시

```text
아래 KPI 값을 기준으로 성과평가 코멘트와 1:1 코칭 질문을 작성해줘.

부서: 영업
과제: 매출액
KPI: 매출액
금년계획: 5500
달성실적: 5300
가중치: 0.2
잘한점/보완점: 마케팅 강화 필요

KPI Agent Knowledge의 산식과 효성 Way 관점으로 해석해줘.
```
