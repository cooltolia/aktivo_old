;
(function () {
    var profitData = [2100, 1700, 1200, 1600, 1250, 650];
    var dividendsData = [1.3, 1.08, 0.71, 0.98, 0.78, 0.38];

    var chart = $('#income-monitoring');
    console.log(!chart.length);


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
                    softMax: 1.3
                },
                {
                    title: {
                        text: '',
                    },
                    labels: {
                        style: {
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontSize: '9px'
                        }
                    },
                    opposite: false,
                    visible: true,
                    tickInterval: 50,
                    softMax: 2200
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
                    valueSuffix: 'млн руб'
                }
            }]
        });
    }
})();