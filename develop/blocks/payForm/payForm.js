

$(document).ready(function () {

    var data = [
    {
        id: 'isk',
        text: '<div class="selected__option">Написание иска</div>',
        html: '<div class="option__title">Написание иска</div><div class="option__price">10 000р.</div>',
        title: 'Написание иска',
        price: '10 000'
    }, {
        id: 'buisness',
        text: '<div class="selected__option">Защита бизнеса</div>',
        html: '<div class="option__title">Защита бизнеса</div><div class="option__price">20 000р.</div>',
        title: 'Защита бизнеса',
        selected: true,
        price: '20 000'
    }, {
        id: 'court',
        text: '<div class="selected__option">Представительство в суде</div>',
        html: '<div class="option__title">Представительство в суде</div><div class="option__price">30 000р.</div>',
        title: 'Представительство в суде',
        price: '30 000'
    }

    ];

    $('.payForm__select').select2({
        data: data,
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function (data) {
            return data.html;
        },
        templateSelection: function (data) {
            return data.text;
        },
        minimumResultsForSearch: Infinity,
        allowEmpty: true,
        placeholder: 'Выберите услугу',
        width: '100%'
    });

    var $sum = $('.payForm__result-sum');

    var data = $(".payForm__select").select2('data');

    if (data)
        var price  = data[0].price;

    $sum.val(price + ' р.')

    $('.payForm__select').on('select2:select', function (e) {
        var data = $(".payForm__select").select2('data');
        var price = data[0].price;
        
        $sum.val(price + ' р.')
    });

    $form = $('.payForm__form');

    $form.submit(function(e) {
        e.preventDefault();
        // debugger;
        let data = $(this).serializeArray();

        data[4].value = data[4].value.replace(/\D/g, '');
        console.log(data);
        
    })

    $(".payForm input[name='payPhone']").inputmask();
});