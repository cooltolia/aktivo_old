;
(function () {
    var profitData = [2500, 1700, 1200, 1600, 1250, 650];
    var dividendsData = [5, 10, 20, 30, 20, 15];
    var dividendsMax = 35;
    var profitMax = 2500;

    var chart = $('#income-monitoring');

    if (chart.length) {
        Highcharts.chart('income-monitoring', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '',
            },
            exporting: {
                enabled: false
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
                            fontWeight: '400'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                }
            },
            xAxis: [{
                categories: ['Фев 18', 'Мар 18', 'Апр 18', 'Май 18', 'Июн 18', 'Июл 18'],
                crosshair: false,
                labels: {
                    style: {
                        color: 'rgba(0, 0, 0, 0.4)',
                        fontSize: '9px'
                    }
                },
            }],
            yAxis: [{
                    visible: false,
                    min: 0,
                    max: dividendsMax,
                },
                {
                    max: profitMax,
                    title: {
                        text: '',
                    },
                    labels: {
                        style: {
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontSize: '9px'
                        }
                    },
                }
            ],
            legend: {
                enabled: false,
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Сумма выплат',
                type: 'column',
                yAxis: 1,
                data: profitData,
                color: '#3c7bd8',
                tooltip: {
                    valueSuffix: ' 000 руб'
                },
            }, {
                name: 'Доходность',
                type: 'line',
                data: dividendsData,
                color: '#ffd729',
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    }
})();