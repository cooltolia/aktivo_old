(function() {
    // var resourceChartElement = document.getElementById("income-chart");

    // if (resourceChartElement) {
    //     var ctx = resourceChartElement.getContext("2d")

    //     Chart.pluginService.register({
    //         beforeRender: function (chart) {
    //             if (chart.config.options.showAllTooltips) {
    //                 // create an array of tooltips
    //                 // we can't use the chart tooltip because there is only one tooltip per chart
    //                 chart.pluginTooltips = [];
    //                 chart.config.data.datasets.forEach(function (dataset, i) {
    //                     chart.getDatasetMeta(i).data.forEach(function (sector, j) {
    //                         if (sector._datasetIndex > 0) return
    //                         chart.pluginTooltips.push(new Chart.Tooltip({
    //                             _chart: chart.chart,
    //                             _chartInstance: chart,
    //                             _data: chart.data,
    //                             _options: chart.options.tooltips,
    //                             _active: [sector]
    //                         }, chart));
    //                     });
    //                 });

    //                 // turn off normal tooltips
    //                 chart.options.tooltips.enabled = false;
    //             }
    //         },
    //         afterDraw: function (chart, easing) {
    //             if (chart.config.options.showAllTooltips) {
    //                 // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
    //                 if (!chart.allTooltipsOnce) {
    //                     if (easing !== 1)
    //                         return;
    //                     chart.allTooltipsOnce = true;
    //                 }

    //                 // turn on tooltips
    //                 chart.options.tooltips.enabled = true;
    //                 Chart.helpers.each(chart.pluginTooltips, function (tooltip) {

    //                     // if (tooltip._active[0]._datasetIndex > 0) return;

    //                     tooltip.initialize();
    //                     tooltip.update();
    //                     // we don't actually need this since we are not animating tooltips
    //                     tooltip.pivot();
    //                     tooltip.transition(easing).draw();
    //                 });
    //                 chart.options.tooltips.enabled = false;
    //             }
    //         }
    //     })

    //     var realLineData = [1.3, 1.08, 0.71, 0.98, 0.78, 0.38]

    //     var mixedChart = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             datasets: [{
    //                     label: 'Доходность',
    //                     data: [2100, 1700, 1200, 1600, 1250, 650],
    //                     type: 'line',
    //                     borderColor: '#ffd729',
    //                     pointBackgroundColor: '#ffd729',
    //                     fill: false,
    //                 },
    //                 {
    //                     backgroundColor: '#3c7bd8',
    //                     hoverBackgroundColor: '#3c7bd8',
    //                     label: 'Сумма выплат',
    //                     data: [2100, 1700, 1200, 1600, 1250, 650],
    //                     borderWidth: 0
    //                 },
    //             ],
    //             labels: ['Фев 18', 'Мар 18', 'Апр 18', 'Май 18', 'Июн 18', 'Июл 18']
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         fontColor: "rgba(0, 0, 0, 0.4)",
    //                         fontSize: 9,
    //                         padding: 10,
    //                         beginAtZero: true,
    //                     },
    //                     gridLines: {
    //                         drawBorder: false,
    //                     }
    //                 }],
    //                 xAxes: [{
    //                     barThickness: 45,
    //                     gridLines: {
    //                         display: false,
    //                         drawBorder: false,
    //                     },
    //                     ticks: {
    //                         fontColor: "rgba(0, 0, 0, 0.4)",
    //                         fontSize: 9,
    //                     }
    //                 }]
    //             },
    //             legend: {
    //                 display: true,
    //                 position: 'right',
    //                 labels: {
    //                     boxWidth: 16,
    //                     fontSize: 12,
    //                     fontColor: '#000',
    //                     padding: 15,
    //                 }
    //             },
    //             elements: {
    //                 line: {
    //                     tension: 0
    //                 }
    //             },
    //             tooltips: {
    //                 mode: 'x',
    //                 displayColors: false,
    //                 yAlign: 'bottom',
    //                 xAlign: 'center',
    //                 bodyFontColor: '#000',
    //                 bodyFontSize: 14,
    //                 backgroundColor: 'transparent',
    //                 custom: function (tooltip) {
    //                     if (!tooltip) return;
    //                     // disable displaying the color box;
    //                     tooltip.displayColors = false;
    //                 },
    //                 callbacks: {
    //                     label: function (tooltipItem, data) {
    //                         var dataset = data.datasets[tooltipItem.datasetIndex];
    //                         if (tooltipItem.datasetIndex > 0) {
    //                             return dataset.data[tooltipItem.index];
    //                         }
    //                         var label = realLineData[tooltipItem.index];

    //                         return label;
    //                     },
    //                     // remove title
    //                     title: function (tooltipItem, data) {
    //                         if (tooltipItem.datasetIndex > 0) {
    //                             return dataset.data[tooltipItem.index];
    //                         } else {
    //                             return null
    //                         }
    //                     }
    //                 }
    //             },
    //             showAllTooltips: true,
    //             maintainAspectRatio: false,
    //             responsive: true
    //         },

    //     });
    // }

    // var resizeId;
    // $(window).resize(function () {
    //     clearTimeout(resizeId);
    //     resizeId = setTimeout(afterResizing, 100);
    // });

    // afterResizing();

    // function afterResizing() {
    //     if (resourceChartElement) {
    //         var canvaswidth = resourceChartElement.width;
    //         if (canvaswidth <= 500) {

    //             mixedChart.options.legend.display = false;
    //         } else {
    //             mixedChart.options.legend.display = true;
    //         }
    //         mixedChart.update();
    //     }
    // }

    /* 
    --------------------------------------------------

    NEW REALIZATION

    --------------------------------------------------
    
    */

    (function() {
        var profitData = [
            2100,
            1700,
            1200,
            1600,
            1250,
            650,
            2100,
            1700,
            1200,
            1600,
            1250,
            650,
            2100,
            1700,
            1200,
            1600,
            1250,
            650,
            2100,
            1700
        ];
        var dividendsData = [
            1.3,
            1.08,
            0.71,
            0.98,
            0.78,
            0.38,
            1.3,
            1.08,
            0.71,
            0.98,
            0.78,
            0.38,
            1.3,
            1.08,
            0.71,
            0.98,
            0.78,
            0.38
        ];

        var chart = $('#income-chart');
        var columnWidth = 25;
        var chartMinWidth = columnWidth * dividendsData.length * 1.5;
        console.log(chartMinWidth);

        setTimeout(() => {
            new SimpleBar(chart.find('.highcharts-scrolling')[0], {
                autoHide: false
            });
        }, 1000);

        if (chart.length) {
            Highcharts.chart('income-chart', {
                chart: {
                    zoomType: 'xy',
                    scrollablePlotArea: {
                        minWidth: chartMinWidth
                    }
                },
                title: {
                    text: ''
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
                    },
                    column: {
                        pointWidth: columnWidth
                    }
                },
                xAxis: [
                    {
                        categories: ['Фев 18', 'Мар 18', 'Апр 18', 'Май 18', 'Июн 18', 'Июл 18'],
                        crosshair: false,
                        labels: {
                            style: {
                                color: 'rgba(0, 0, 0, 0.4)',
                                fontSize: '9px'
                            }
                        },
                        min: 0,
                        // max: 8,
                        scrollbar: {
                            enabled: true,
                            barBackgroundColor: '#ffd729',
                            barBorderRadius: 2,
                            barBorderWidth: 0,
                            buttonBackgroundColor: 'transparent',
                            buttonBorderWidth: 0,
                            buttonArrowColor: 'transparent',
                            buttonBorderRadius: 0,
                            rifleColor: 'transparent',
                            trackBackgroundColor: '#e9e9e9',
                            trackBorderWidth: 0,
                            height: 4
                        }
                    }
                ],
                yAxis: [
                    {
                        visible: false,
                        softMax: 1.3
                    },
                    {
                        title: {
                            text: ''
                        },
                        labels: {
                            style: {
                                color: 'rgba(0, 0, 0, 0.4)',
                                fontSize: '9px'
                            }
                        },
                        opposite: false,
                        visible: true,
                        tickInterval: 10,
                        softMax: 2200
                    }
                ],
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        name: 'Сумма выплат',
                        type: 'column',
                        yAxis: 1,
                        data: profitData,
                        color: '#3c7bd8',
                        tooltip: {
                            valueSuffix: ' 000 руб'
                        },
                        states: {
                            inactive: {
                                opacity: 0.8
                            }
                        }
                    },
                    {
                        name: 'Доходность',
                        type: 'line',
                        data: dividendsData,
                        color: '#ffd729',
                        tooltip: {
                            valueSuffix: 'млн руб'
                        },
                        states: {
                            inactive: {
                                opacity: 0.8
                            }
                        }
                    }
                ]
            });
        }
    })();
})();
