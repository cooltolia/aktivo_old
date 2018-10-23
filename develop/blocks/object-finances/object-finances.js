;(function() {
    var resourceChartElement = document.getElementById("chart-area");
    var ctx = resourceChartElement.getContext("2d")

    var grossIncome = 24260353; // Валовый доход
    var fee = 2559803; // Комиссия за управление
    var debit = 3781927; // Расходы
    var operatingProfit = grossIncome - debit; // Чистый операционный доход
    var availableEarnest = operatingProfit - fee; // Прибыль к распределению
    

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
                ]
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
                ]
            }
            ],
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var abc2 = function (n) {
                            n += "";
                            n = new Array(4 - n.length % 3).join("U") + n;
                            return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
                        };

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
            rotation: (-0.5 * Math.PI) - (50 / 180 * Math.PI)
        }
    });
})();

