;
(function () {
    var chart = document.getElementById("monitoring-finances");

    if (chart) {
        var objects = [
            {name: 'Супермаркет Пятерочка', data: 100},
            {name: 'Супермаркет Десяточка', data: 30},
            {name: 'Минимаркет Двоечка', data: 50},
            {name: 'Минимаркет Нулевочка', data: 10}
        ]


        // Create the chart
        Highcharts.chart(chart, {
            chart: {
                type: "pie",
                margin: [0, 0, 0, 0]
            },
            credits: {
                enabled: false
            },
            title: {
                text: ""
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    // startAngle: -90,
                    borderColor: null,
                    size: '100%'
                }
            },
            tooltip: {
                pointFormat: '<b>{point.y} руб</b>',
                percentageDecimals: 2,
            },
            series: [{
                    name: "sa",
                    data: [
                        {
                            name: objects[0].name,
                            y: objects[0].data,
                            color: '#5fce67'
                        },
                        {
                            name: objects[1].name,
                            y: objects[1].data,
                            color: '#3c7bd8'
                        },
                        {
                            name: objects[2].name,
                            y: objects[2].data,
                            color: '#ffd729'
                        },
                        {
                            name: objects[3].name,
                            y: objects[3].data,
                            color: '#f52f4b'
                        },
                    ],
                    innerSize: '85%',
                }
            ]
        });
    }
})();