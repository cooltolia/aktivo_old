(function () {
    var chart = document.getElementById('monitoring-finances');

    if (chart) {
        var objects = [
            { name: 'Супермаркет Пятерочка', data: 100, color: '#5fce67' },
            { name: 'Супермаркет Десяточка', data: 30, color: '#3c7bd8' },
            { name: 'Минимаркет Двоечка', data: 50, color: '#ffd729' },
            { name: 'Минимаркет Нулевочка', data: 10, color: '#f52f4b' },
        ];

        // Create the chart
        Highcharts.chart(chart, {
            chart: {
                type: 'pie',
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                backgroundColor: 'transparent',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: '',
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    events: {
                        click: function (event) {
                            console.log(`${event.point.name} — ${event.point.y}руб.`);
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    startAngle: -45,
                    borderColor: null,
                    size: '100%',
                },
            },
            tooltip: {
                pointFormat: '<b>{point.y} руб</b>',
                percentageDecimals: 2,
            },
            series: [
                {
                    name: '',
                    data: [
                        {
                            name: objects[0].name,
                            y: objects[0].data,
                            color: objects[0].color,
                        },
                        {
                            name: objects[1].name,
                            y: objects[1].data,
                            color: objects[1].color,
                        },
                        {
                            name: objects[2].name,
                            y: objects[2].data,
                            color: objects[2].color,
                        },
                        {
                            name: objects[3].name,
                            y: objects[3].data,
                            color: objects[3].color,
                        },
                    ],
                    innerSize: '83%',
                },
            ],
        });
    }
})();
