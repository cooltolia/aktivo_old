(function() {
    var partnersContent = $('.partners-content');
    if (partnersContent.length === 0) return;

    var charts = $('.partners-content__chart');

    charts.each(function() {
        var id = $(this).attr('id');
        var data = $(this).data('values');

        chartInit(id, data);
    });

    function chartInit(selector, data) {
        return new Highcharts.chart(selector, {
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            colors: ['#3C7BD8'],
            legend: false,
            xAxis: {
                categories: ['Переходы', 'Регистрации', 'Сделки'],
                labels: {
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                // column: {},
                column: {
                    dataLabels: {
                        enabled: true,
                        padding: 0,
                        style: {
                            color: '#000000',
                            fontSize: '12px',
                            fontWeight: '700'
                        }
                    }
                    //
                }
            },
            series: [
                {
                    name: 'Количество',
                    data: data
                }
            ]
        });
    }

    var copyIputButton = $('.partners-content__copy');

    copyIputButton.on('click', function(e) {
        e.preventDefault();
        var btn = $(this);

        btn.addClass('clicked');
        btn.prop('disabled', true);

        var inputToCopy = btn.prev().find('input')[0];
        inputToCopy.disabled = false;
        inputToCopy.select();
        inputToCopy.setSelectionRange(0, 99999);
        document.execCommand('copy');
        inputToCopy.disabled = true;

        setTimeout(function() {
            btn.removeClass('clicked');
            btn.prop('disabled', false);
        }, 500);
    });
})();
