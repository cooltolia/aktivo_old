;
(function () {
    $chart = $('#top_x_div');
    if ($chart.length === 0) return;

    var percentFormatFunction = d3.format(".2f"),
        yearFormatter = function (year) {
            switch (parseInt(year)) {
                case 1:
                    return "1 год";
                case 2:
                case 3:
                case 4:
                    return year + " года";
                default:
                    return year + " лет";
            }

        };
    /** add probel num **/
    var abc2 = function (n) {
        n += "";
        n = new Array(4 - n.length % 3).join("U") + n;
        return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    };
    var chart = new Highcharts.chart('top_x_div', {
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            colors: ['#e7acee', '#f0d561', '#8589f8', '#aaed96'],
            legend: {
                align: 'left',
                itemDistance: 20,
                itemStyle: {
                    font: '12px "Segoe UI"',
                    color: '#000'
                },
                useHTML: true,
                labelFormatter: function () {
                    return '<span title="' + this.name + '"><span class="gals"></span>' + this.name + '</span>';
                }
            },
            xAxis: {
                categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027',
                    '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039',
                    '2040', '2041'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormatter: function () {
                    var seriesName = this.series.name,
                        lastSeries = this.series.chart.series.slice(-1)[0],
                        lastSeriesBasePointValue = lastSeries.data[0].y,
                        percentage = this.series.index === 1 || this.series.index === 3 ? "" :
                        percentFormatFunction((this.y / lastSeriesBasePointValue) * 100) + '%';

                    return '<div class="row">' +
                        '<div class="label">' + seriesName + '</div>' +
                        '<div class="proc">' + percentage + '</div>' +
                        '<div class="income">' + abc2(this.y) + '  р.</div>' +
                        '</div>';
                },
                shared: true,
                useHTML: true,
                valueDecimal: 0
            },
            plotOptions: {
                column: {
                    stacking: 'total'
                }
            },
            series: [{
                    name: 'Рентный доход',
                    data: []
                },
                {
                    name: 'Накопленный рентный доход',
                    data: []
                },
                {
                    name: 'Рост стоимости',
                    data: []
                },
                {
                    name: 'Стоимость актива',
                    data: []
                }
            ]
        }),
        instruments = {
            'aktivo': {
                rentKoeff: [0.11, 0.116, 0.121, 0.127, 0.134, 0.140, 0.147, 0.155, 0.163, 0.171],
                capKoeff: [0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]
            },
            'deposit': {
                rentKoeff: [0.06, 0.06, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                capKoeff: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            'bond': {
                rentKoeff: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],
                capKoeff: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1]
            },
            'flat': {
                rentKoeff: [0.03, 0.0306, 0.0315, 0.0325, 0.0334, 0.0344, 0.0355, 0.0365, 0.0376, 0.0388],
                capKoeff: [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]
            }
        };
    var investAmountCalculator = function (years, annual, instrument) {
        var summ = annual;
        for (var i = 0; i < years; i++) {
            if (i === 0)
                summ /= instrument.rentKoeff[i];
            else
                summ += summ * instrument.capKoeff[i];
        }
        return Math.ceil(summ);
    };
    var investSeriesCalculator = function (annual, years, instrument) {
        var investmentBody = [],
            rent = [],
            capitalization = [],
            accumulatedRent = [];

        // year by year calculator
        // for (var i = 0; i < years; i++) {
        //     investmentBody[i] = Math.ceil(annual);
        //     rent[i] = Math.ceil(annual * instrument.rentKoeff[i]);
        //     capitalization[i] = (i == 0 ? 0 : (i == 1) ? Math.ceil(investmentBody[i] * instrument.capKoeff[i]) :
        //             Math.ceil(capitalization[i - 1] / (1 - instrument.capKoeff[i])));
        // }

        //with collect
        for (var i = 0; i < years; i++) {
            investmentBody[i] = (i === 0) ? Math.ceil(annual) : Math.ceil(investmentBody[i - 1] + capitalization[i - 1]);
            rent[i] = Math.ceil(annual * instrument.rentKoeff[i]);
            accumulatedRent[i] = (i === 0) ? 0 : (accumulatedRent[i - 1] + rent[i - 1]);
            capitalization[i] = (i === 0) ? 0 : Math.ceil(investmentBody[i] * instrument.capKoeff[i]);
        }

        return {
            'capitalization': capitalization,
            'rent': rent,
            'accumulated_rent': accumulatedRent,
            'investment': investmentBody
        };
    };
    var summSlider = $("input#summ1-range").rangeslider({
            polyfill: false,
            // Callback function
            onSlide: function (position, value) {
                update(1, value, true)
            },
            onSlideEnd: function (position, value) {
                update(1, value, false)
            }
        }),
        yearSlider = $("input#summ2-range").rangeslider({
            polyfill: false,
            // Callback function
            onSlide: function (position, value) {
                update(2, value, true)
            },
            onSlideEnd: function (position, value) {
                update(2, value, false);
            }
        });
    //changed. now with parameter
    var update = function (slider, val, onlyTextUpdate) {
        if (onlyTextUpdate === undefined)
            onlyTextUpdate = false;

        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $vsumm1 = $("#summ1-range"),
            income = slider === 1 ? val : $vsumm1.val(),
            $vsumm2 = $("#summ2-range"),
            years = slider === 2 ? val : $vsumm2.val(),
            names = ['aktivo' /*, 'deposit', 'bond', 'flat'*/ ],
            aktivoInvest = investAmountCalculator(1, income, instruments['aktivo']);

        // names.forEach(function (element) {
        //     var instrument = instruments[element],
        //         investSumm = investAmountCalculator(years, income, instrument),
        //         divInvestSumm = $("div#" + element + " .invest-summa");
        //     divInvestSumm.text(investSumm);
        //     divInvestSumm.append("<span class='ruble'/>");
        //     if (element === 'aktivo')
        //         aktivoInvest = investSumm;
        // });

        var series = investSeriesCalculator(aktivoInvest, years, instruments['aktivo']);
        if (onlyTextUpdate === false) {
            chart.series[0].setData(series['rent']);
            chart.series[1].setData(series['accumulated_rent']);
            chart.series[2].setData(series['capitalization']);
            chart.series[3].setData(series['investment']);
        }

        var totalRent = series['accumulated_rent'][years - 1] + series['rent'][years - 1],
            totalRentPercent = totalRent * 100 / aktivoInvest,
            totalCapitalization = series['capitalization'].reduce(function (a, b) {
                return a + b;
            }),
            totalCapitalizationPercent = (((series['investment'][years - 1] + series['capitalization'][years - 1]) - aktivoInvest) / aktivoInvest) * 100,
            total = totalRent + series['investment'][years - 1] + series['capitalization'][years - 1],
            totalPercentage = ((total - aktivoInvest) / aktivoInvest) * 100;

        $("#summ2, #vyear").text(yearFormatter(years));

        $("#result1").text(abc2(total));
        $("#result1_percent").text("+" + percentFormatFunction(totalPercentage) + "%");

        $("#result2").text(abc2(totalRent));
        $("#result2_percent").text("+" + percentFormatFunction(totalRentPercent) + "%");

        $("#result3").text(abc2(totalCapitalization));
        $("#result3_percent").text("+" + percentFormatFunction(totalCapitalizationPercent) + "%");

        $("#result4").text(abc2(aktivoInvest));

        $("#summ1").html(abc2(income));
        $('#summ1-scroll')
            .find('.rangeslider__handle')
            .html('<div class="tooltip2">' +
                '<div class="title">Инвестировать от</div>' +
                '<div class="summ-t">' + abc2(aktivoInvest) + '<span class="ruble"/></div>' +
                '</div>');
        if (income >= 1900000) {
            $("#summ1-scroll").addClass("no-right");
        } else {
            $("#summ1-scroll").removeClass("no-right");
        }
    };
    update();
    return {};
})();