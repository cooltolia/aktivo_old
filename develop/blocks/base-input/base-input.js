;(function() {
    $inputs = $('.base-input__input');

    $inputs.each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() !== '') {
                $(this).addClass('hasValue');
            } else {
                $(this).removeClass('hasValue');
            }
        })
    })
})()