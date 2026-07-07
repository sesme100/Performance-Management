---
layout: page-fullwidth
title: "KPI 예시 테이블"
subheadline: "Editable KPI Playground"
teaser: "원본 엑셀의 영업, 생산, 연구, 재무 KPI 예시 표를 웹에서 확인하고 부서별 계산 결과를 볼 수 있습니다."
permalink: "/kpi-playground/"
---

<!-- markdownlint-disable MD033 MD060 -->

<style>
.kpi-note { background: #eef7ff; border-left: 4px solid #2584c7; padding: 1rem; margin-bottom: 1.5rem; }
.kpi-table-wrap { overflow-x: auto; margin-bottom: 1.5rem; }
.kpi-table { min-width: 1180px; }
.kpi-table input, .kpi-table select { width: 100%; margin: 0; min-width: 4.5rem; }
.kpi-table textarea { width: 100%; min-width: 13rem; min-height: 3.2rem; margin: 0; }
.kpi-input { background: #d9ecff !important; border-color: #2584c7 !important; }
.kpi-output { font-weight: 700; }
.kpi-summary { background: #f7f7f7; padding: 1rem; margin-top: 1rem; }
.kpi-badge { display: inline-block; padding: .25rem .5rem; border-radius: 3px; background: #234d63; color: #fff; }
.kpi-department-title { margin-top: 2.5rem; }
.kpi-original-actions { display: flex; flex-wrap: wrap; gap: .6rem; margin: 1rem 0 1.5rem; }
.kpi-department-summary { background: #f7fbff; border: 1px solid #d9e6f2; border-radius: 8px; padding: 1rem; margin: -0.5rem 0 2rem; }
.kpi-department-summary p { margin-bottom: .45rem; }
.kpi-agent-prompt { background: #fff; color: #172033; border: 1px solid #d9e6f2; border-radius: 8px; box-shadow: 0 12px 30px rgba(23, 32, 51, .08); padding: 1.2rem; overflow-x: auto; font-family: 'Noto Sans KR', sans-serif; font-size: .98rem; line-height: 1.8; }
.kpi-agent-prompt code { background: transparent; color: inherit; font-family: inherit; font-size: inherit; line-height: inherit; }
</style>

<div class="kpi-note" markdown="1">
이 페이지는 업로드한 원본 엑셀 `효성인력개발원_KPI 구성요소_0702_Value.xlsx`의 **영업, 생산, 연구, 재무** KPI 예시 표를 기준으로 구성했습니다. 파란색 칸은 각 사용자가 브라우저에서 수정할 수 있으며, 금년계획과 달성실적을 바꾸면 각 표의 계획대비 달성률, 실적, 부서별 요약이 다시 계산됩니다.
</div>

<div class="kpi-original-actions">
  <a class="button small" href="{{ '/assets/downloads/효성인력개발원_KPI 구성요소_0702_Value.xlsx' | relative_url }}" download>원본 엑셀 다운로드</a>
</div>

## KPI 입력 및 자동 계산

{% for department in site.data.kpi_examples.departments %}
<h3 class="kpi-department-title">{{ department.title }}</h3>
<div class="kpi-table-wrap">
<table class="kpi-table" data-kpi-table data-department="{{ department.name }}">
  <thead>
    <tr>
      {% for header in site.data.kpi_examples.headers %}<th>{{ header }}</th>{% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for row in department.rows %}
    <tr data-kpi-row data-department="{{ department.name }}" data-direction="{{ row.direction }}">
      <td><input class="kpi-input" data-field="category" value="{{ row.category }}"></td>
      <td><input class="kpi-input" data-field="task" value="{{ row.task }}"></td>
      <td><textarea class="kpi-input" data-field="action">{{ row.action }}</textarea></td>
      <td><input class="kpi-input" data-field="weight" type="number" value="{{ row.weight }}" step="0.01"></td>
      <td><input class="kpi-input" data-field="schedule" value="{{ row.schedule }}"></td>
      <td><input class="kpi-input" data-field="kpi" value="{{ row.kpi }}"></td>
      <td><input class="kpi-input" data-field="unit" value="{{ row.unit }}"></td>
      <td><input class="kpi-input" data-field="previous" value="{{ row.previous }}"></td>
      <td><input class="kpi-input" data-field="plan" type="{% if row.direction == 'text' %}text{% else %}number{% endif %}" value="{{ row.plan }}" step="0.01"></td>
      <td><input class="kpi-input" data-field="actual" type="{% if row.direction == 'text' %}text{% else %}number{% endif %}" value="{{ row.actual }}" step="0.01"></td>
      <td class="kpi-output" data-output="achievement">{{ row.achievement }}</td>
      <td class="kpi-output" data-output="score">{{ row.score }}</td>
      <td><textarea class="kpi-input" data-field="comment">{{ row.comment }}</textarea></td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>
<div class="kpi-department-summary" data-summary-for="{{ department.name }}">
  <p>{{ department.name }} 가중치 합계: <strong data-summary="weight">0</strong></p>
  <p>{{ department.name }} 평균 실적: <span class="kpi-badge" data-summary="score">0.0</span></p>
  <p>{{ department.name }} 판정: <strong data-summary="rating">-</strong></p>
  <p>{{ department.name }} 코칭 우선순위: <strong data-summary="focus">-</strong></p>
  <button type="button" class="button small" data-download-for="{{ department.name }}">KPI 엑셀 다운로드</button>
</div>
{% endfor %}

## Copilot Agent 활용 방법

1. 이 웹페이지의 내용을 Copilot Agent Builder의 Knowledge URL로 등록합니다.
2. 평가자가 실제로 사용할 때는 위의 **원본 엑셀 다운로드** 파일을 내려받아 개인 또는 부서 KPI 값으로 수정합니다.
3. Copilot Agent 대화에 수정한 엑셀 파일을 업로드합니다.
4. Agent에게 부서명, 평가 대상자, 평가 목적, 원하는 출력 형식을 함께 알려줍니다.
5. Agent 답변은 초안으로 사용하고, 최종 평가는 회사의 공식 HR 기준과 평가자가 확인한 실제 행동 사례로 검토합니다.

## KPI 해석 기준

| 성취율 | 판정 | 평가자 코멘트 방향 |
|---:|---|---|
| 110% 이상 | 탁월 | 성공 요인과 재현 가능성을 확인합니다 |
| 100% 이상 | 달성 | 목표 달성 과정의 강점과 확장 가능성을 확인합니다 |
| 90% 이상 | 보완 | 미달 원인과 지원 필요사항을 함께 확인합니다 |
| 90% 미만 | 개선 필요 | 목표, 실행계획, 리스크 관리 방식을 구체적으로 재설계합니다 |

## 예시 프롬프트

<pre class="kpi-agent-prompt"><code>첨부한 KPI 엑셀 파일을 기준으로 성과평가 초안을 작성해줘.

대상 부서: 영업
평가 목적: 중간 성과 리뷰
출력 형식:
1. KPI별 계획대비 달성률과 실적 요약
2. 잘한점 3가지
3. 보완점 3가지
4. 효성 Way의 최고, 혁신, 책임, 신뢰 관점 해석
5. 다음 1:1 면담에서 사용할 코칭 질문 5개

주의사항:
- 평가 등급을 단정하지 말고 평가자가 검토할 근거 중심으로 작성해줘.
- 수치와 코멘트는 엑셀의 KPI 표를 우선해서 사용해줘.
- 개인정보나 민감한 인사 판단은 포함하지 말아줘.</code></pre>

추가 질문 예시:

* "생산 부서 KPI 중 보완이 필요한 항목만 골라 원인 가설과 지원 방안을 정리해줘."
* "연구 부서 KPI 결과를 바탕으로 성장 피드백 문장을 부드럽게 작성해줘."
* "재무 부서 KPI에서 리스크관리와 보고체계 항목을 효성 Way의 책임 관점으로 해석해줘."
* "첨부 엑셀의 부서별 가중치 합계가 1.0인지 확인하고, 누락된 KPI가 있어 보이는지 점검해줘."

<script src="{{ '/assets/js/kpi-playground.js' | relative_url }}"></script>
