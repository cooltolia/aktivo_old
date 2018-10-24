;(function() {
    var resourceChartElement = document.getElementById("financies-chart");

    if (resourceChartElement) {
        var ctx = resourceChartElement.getContext("2d")

        var grossIncome = 24260353; // Валовый доход
        var fee = 2559803; // Комиссия за управление
        var debit = 3781927; // Расходы
        var operatingProfit = grossIncome - debit; // Чистый операционный доход
        var availableEarnest = operatingProfit - fee; // Прибыль к распределению

        var formattedGrossIncome = abc2(grossIncome);
        formattedGrossIncome = formattedGrossIncome + ' ₽';

        function abc2(n) {
            n += "";
            n = new Array(4 - n.length % 3).join("U") + n;
            return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
        };

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    //Get ctx from string
                    var ctx = chart.chart.ctx;

                    //Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
                    var color = centerConfig.color || '#000';
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

                    ctx.font = 'normal 16px ' + fontStyle;

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2 - 12);
                    ctx.fillStyle = color;

                    var lines = txt.split('\n');
                    var lineheight = 25;

                    for (var i = 0; i < lines.length; i++)
                        if (i === lines.length - 1) {
                            ctx.font = "bold 18px " + fontStyle;
                            ctx.fillText(lines[i], centerX, centerY + (i * lineheight));
                        } else {
                            ctx.fillText(lines[i], centerX, centerY + (i * lineheight));
                        }
                }
            }
        });

        var resourceChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: [
                    "Комиссия за управление",
                    "Прибыль к распределению",
                    "Чистый операционный доход",
                    "Расходы"
                ],
                datasets: [{
                        backgroundColor: [
                            "#3c7bd8",
                            "#ffd729",
                            "#5fce67",
                            "#f52f4b",
                        ],
                        hoverBackgroundColor: [
                            "#3c7bd8",
                            "#ffd729",
                            "#5fce67",
                            "#f52f4b",
                        ],
                        data: [
                            0,
                            0,
                            operatingProfit,
                            debit,
                        ],
                        borderWidth: 0
                    },
                    {
                        backgroundColor: [
                            "#3c7bd8",
                            "#ffd729",
                            "#5fce67",
                            "#f52f4b",
                        ],
                        hoverBackgroundColor: [
                            "#3c7bd8",
                            "#ffd729",
                            "#5fce67",
                            "#f52f4b",
                        ],
                        data: [
                            fee,
                            availableEarnest,
                        ],
                        borderWidth: 0
                    }
                ],
            },
            options: {
                legend: {
                    display: false
                },
                elements: {
                    center: {
                        text: 'Валовый доход \n' + formattedGrossIncome,
                        fontStyle: 'Segoe UI',
                        sidePadding: 20
                    }
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {

                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            //calculate the total of this data set
                            var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                            });
                            //get the current items value
                            var currentValue = dataset.data[tooltipItem.index];
                            var currentLabel = data.labels[tooltipItem.index];
                            //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                            var formattedValue = abc2(currentValue);
                            return currentLabel + ': ' + formattedValue + " ₽";
                        }

                    }
                },
                rotation: (-0.5 * Math.PI) - (50 / 180 * Math.PI),
                cutoutPercentage: 65,
                maintainAspectRatio: false
            }
        });
    }
    
})();

