(function () {
    function numberFrom(row, field) {
        var input = row.querySelector('[data-field="' + field + '"]');
        var value = input ? parseFloat(input.value) : 0;
        return Number.isFinite(value) ? value : 0;
    }

    function textFrom(row, field) {
        var input = row.querySelector('[data-field="' + field + '"]');
        return input ? input.value : '';
    }

    function overallRating(score) {
        if (score >= 105) return '기대 이상';
        if (score >= 95) return '기대 충족';
        if (score >= 85) return '보완 필요';
        return '집중 개선 필요';
    }

    function calculateAchievement(plan, actual, direction) {
        if (direction === 'text') return 1;
        if (plan <= 0 || actual < 0) return 0;
        if (direction === 'lower') return plan / Math.max(actual, 0.0001);
        return actual / plan;
    }

    function formatRatio(value) {
        return value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    }

    function formatScore(value) {
        return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function timestamp() {
        var now = new Date();
        var pad = function (value) { return String(value).padStart(2, '0'); };
        return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + '_' + pad(now.getHours()) + pad(now.getMinutes());
    }

    function downloadBlob(content, filename, type) {
        var blob = new Blob([content], { type: type });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function valueFrom(row, field) {
        var output = row.querySelector('[data-output="' + field + '"]');
        if (output) return output.textContent;
        return textFrom(row, field);
    }

    function downloadDepartmentExcel(department) {
        update();

        var table = document.querySelector('[data-kpi-table][data-department="' + department + '"]');
        var summary = document.querySelector('[data-summary-for="' + department + '"]');
        if (!table || !summary) return;

        var bodyRows = Array.prototype.slice.call(table.querySelectorAll('[data-kpi-row]')).map(function (row) {
            return '<tr>' +
                '<td>' + escapeHtml(valueFrom(row, 'category')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'task')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'action')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'weight')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'schedule')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'kpi')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'unit')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'previous')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'plan')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'actual')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'achievement')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'score')) + '</td>' +
                '<td>' + escapeHtml(valueFrom(row, 'comment')) + '</td>' +
                '</tr>';
        }).join('');

        var html = '\ufeff' +
            '<html><head><meta charset="utf-8"><style>' +
            'body{font-family:Malgun Gothic,Arial,sans-serif;}table{border-collapse:collapse;margin-bottom:18px;}th{background:#d9eaf7;color:#111;}td,th{border:1px solid #9fb7d8;padding:8px;vertical-align:top;}h1,h2{color:#172033;}' +
            '</style></head><body>' +
            '<h1>' + escapeHtml(department) + ' KPI 엑셀 다운로드</h1>' +
            '<p>생성 시각: ' + escapeHtml(new Date().toLocaleString('ko-KR')) + '</p>' +
            '<h2>요약</h2>' +
            '<table><tr><th>가중치 합계</th><th>평균 실적</th><th>판정</th><th>코칭 우선순위</th></tr><tr>' +
            '<td>' + escapeHtml(summary.querySelector('[data-summary="weight"]').textContent) + '</td>' +
            '<td>' + escapeHtml(summary.querySelector('[data-summary="score"]').textContent) + '</td>' +
            '<td>' + escapeHtml(summary.querySelector('[data-summary="rating"]').textContent) + '</td>' +
            '<td>' + escapeHtml(summary.querySelector('[data-summary="focus"]').textContent) + '</td>' +
            '</tr></table>' +
            '<h2>KPI 표</h2>' +
            '<table><tr><th>구분*</th><th>과제*</th><th>달성방안*</th><th>가중치(%)*</th><th>일정</th><th>KPI</th><th>단위</th><th>전년실적</th><th>금년계획</th><th>달성실적</th><th>계획대비 달성률</th><th>실적</th><th>잘한점/보완점</th></tr>' +
            bodyRows +
            '</table>' +
            '</body></html>';

        downloadBlob(html, department + '_KPI_성과관리_' + timestamp() + '.xls', 'application/vnd.ms-excel;charset=utf-8');
    }

    function update() {
        var tables = Array.prototype.slice.call(document.querySelectorAll('[data-kpi-table]'));

        tables.forEach(function (table) {
            var department = table.getAttribute('data-department') || '';
            var rows = Array.prototype.slice.call(table.querySelectorAll('[data-kpi-row]'));
            var totalWeight = 0;
            var totalScore = 0;
            var weakest = { name: '-', score: Infinity };

            rows.forEach(function (row) {
                var plan = numberFrom(row, 'plan');
                var actual = numberFrom(row, 'actual');
                var weight = numberFrom(row, 'weight');
                var direction = row.getAttribute('data-direction') || 'higher';
                var achievement = calculateAchievement(plan, actual, direction);
                var score = achievement * 100;
                var task = textFrom(row, 'task');

                row.querySelector('[data-output="achievement"]').textContent = formatRatio(achievement);
                row.querySelector('[data-output="score"]').textContent = formatScore(score);

                totalWeight += weight;
                totalScore += score * weight;

                if (score < weakest.score) {
                    weakest = { name: task, score: score };
                }
            });

            var summary = document.querySelector('[data-summary-for="' + department + '"]');
            var normalizedScore = totalWeight > 0 ? totalScore / totalWeight : 0;
            if (!summary) return;

            summary.querySelector('[data-summary="weight"]').textContent = totalWeight.toFixed(2) + ' (' + (totalWeight * 100).toFixed(0) + '%)';
            summary.querySelector('[data-summary="score"]').textContent = normalizedScore.toFixed(1);
            summary.querySelector('[data-summary="rating"]').textContent = overallRating(normalizedScore);
            summary.querySelector('[data-summary="focus"]').textContent = weakest.name + ' (' + weakest.score.toFixed(1) + ')';
        });
    }

    document.addEventListener('input', function (event) {
        if (event.target.matches('.kpi-input')) update();
    });

    document.addEventListener('change', function (event) {
        if (event.target.matches('.kpi-input')) update();
    });

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-download-for]');
        if (!button) return;
        downloadDepartmentExcel(button.getAttribute('data-download-for'));
    });

    document.addEventListener('DOMContentLoaded', function () {
        update();
    });
})();