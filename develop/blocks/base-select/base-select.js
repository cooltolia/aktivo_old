;
(function () {
$('body').on('click', function(e) {
    console.log(e);
    
})

    var $select = $('.base-select__input');
    var $options = $('.base-select__options-list');
    var $optionsItem = $('.base-select__options-item');

    if ($select.val().trim() !== '') {
        $select.addClass('hasValue');
    }

    $select.on('blur', function () {
        if ($select.val().trim() !== '') {
            $select.addClass('hasValue');
        } else {
            $select.removeClass('hasValue');
        }

    })

    $select.on('click', function () {
        $select.parent().addClass('active');
        $options.slideDown();
    })

    $optionsItem.each(function() {
        $(this).on('click', function (e) {
            var text = $(this).text();
            $select.val(text);
            $select.addClass('hasValue');
            $select.parent().removeClass('active');
            $options.slideUp();
        })
    })
})()