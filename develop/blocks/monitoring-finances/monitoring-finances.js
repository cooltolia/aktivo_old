(function () {
    var profitData = [2500, 1700, 1200, 1600, 1250, 650];
    var dividendsData = [5, 10, 20, 30, 20, 15];
    var dividendsMax = 35;
    var profitMax = 2500;

    var chart = $('#income-monitoring');

    if (chart.length) {
        Highcharts.chart('income-monitoring', {
            chart: {
                zoomType: 'xy',
            },
            title: {
                text: '',
            },
            exporting: {
                enabled: false,
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        align: 'center',
                        enabled: true,
                        color: 'black',
                        padding: 10,
                        style: {
                            textOutline: 'none',
                            fontSize: '14px',
                            fontWeight: '400',
                        },
                        formatter: function () {
                            return this.y + '%';
                        },
                    },
                },
            },
            xAxis: [
                {
                    categories: ['Фев 18', 'Мар 18', 'Апр 18', 'Май 18', 'Июн 18', 'Июл 18'],
                    crosshair: false,
                    labels: {
                        style: {
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontSize: '9px',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    visible: true,
                    min: 0,
                    max: dividendsMax,
                    title: {
                        text: '',
                    },
                    opposite: true,
                    labels: {
                        style: {
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontSize: '9px',
                        },
                    },
                },
                {
                    max: profitMax,
                    title: {
                        text: '',
                    },
                    labels: {
                        style: {
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontSize: '9px',
                        },
                    },
                },
            ],
            legend: {
                enabled: false,
            },
            credits: {
                enabled: false,
            },
            series: [
                {
                    name: 'Сумма выплат',
                    type: 'column',
                    yAxis: 1,
                    data: profitData,
                    color: '#3c7bd8',
                    tooltip: {
                        // valueSuffix: " 000 руб"
                        pointFormatter: function () {
                            return (
                                'Сумма выплат: <b>' +
                                this.y.toLocaleString() +
                                ' 000 руб</b><br>' +
                                'Доля от общих выплат: <b>' +
                                Math.floor((this.y / profitData.reduce((x, y) => x + y, 0)) * 100) +
                                '%</b>'
                            );
                        },
                    },
                },
                {
                    name: 'Доходность',
                    type: 'line',
                    data: dividendsData,
                    color: '#ffd729',
                    tooltip: {
                        valueSuffix: '%',
                    },
                },
            ],
        });
    }

    var timeline = $('#timelinechart');
    if (timeline.length) {
        setTimeout(() => {
            var scrolledArea = timeline.find('.highcharts-scrolling');
            if (scrolledArea.length === 0) return;
            new SimpleBar(scrolledArea[0], {
                autoHide: false,
            });
        }, 1000);

        var timelineData = [
            { name: 'Сбор средств на счет Активо', status: 'finished' },
            { name: 'Формирование Фонда денежными средствами', status: 'finished' },
            {
                name: 'Внесение Центральным Банком РФ изменений в ПДУ, связанных с формированием Фонда',
                status: 'finished',
            },
            {
                name:
                    'Предварительное согласование ДКП недвижимости Управляющей компанией и Специализированным депозитарием',
                status: 'finished',
            },
            {
                name: 'Правка ДКП недвижимости банком-кредитором Продавца',
                status: 'finished',
            },
            {
                name:
                    'Финальное согласование ДКП (полный пакет документов) Управляющей компанией и Специализированным депозитарием',
                status: 'progress',
            },
            {
                name: 'Подписание ДКП и оплата необходимой для снятия обременения суммы Продавцу',
                status: 'future',
            },
            {
                name: 'Погашение кредита Продавцом и снятие обременения',
                status: 'future',
            },
            {
                name: 'Регистрация Росреестром права собственности на Фонд',
                status: 'future',
            },
            { name: 'Передача паев инвесторам', status: 'future' },
        ];
        var finishedColor = '#5fce67';
        var progressColor = '#ffd729';
        var futureColor = '#3c7bd8';

        var timelineColors = [];
        var futureEvents = timelineData.filter(function (event) {
            return event.status === 'future';
        });
        var futureColors = [futureColor];
        var changeColorStep = 100 / futureEvents.length;

        for (var i = 1; i < futureEvents.length; i++) {
            futureColors.push(shadeColor(futureColors[i - 1], -changeColorStep));
        }

        timelineData.map(function (event) {
            if (event.status === 'future') return;

            var color = event.status === 'finished' ? finishedColor : progressColor;
            timelineColors.push(color);
        });

        timelineColors = timelineColors.concat(futureColors);

        var columnWidth = 120;
        var chartMinWidth = columnWidth * timelineData.length;

        Highcharts.chart('timelinechart', {
            chart: {
                type: 'timeline',
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
                },
            },
            xAxis: {
                visible: false,
            },
            yAxis: {
                visible: false,
            },
            title: 'none',
            colors: timelineColors,
            credits: {
                enabled: false,
            },
            series: [
                {
                    data: timelineData,
                },
            ],
        });
    }

    /** just a helper function to calc color for timeline */
    function shadeColor(color, percent) {
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt((R * (100 + percent)) / 100);
        G = parseInt((G * (100 + percent)) / 100);
        B = parseInt((B * (100 + percent)) / 100);

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
        var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
        var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

        return '#' + RR + GG + BB;
    }
})();
