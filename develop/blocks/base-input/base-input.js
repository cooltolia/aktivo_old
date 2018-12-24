;(function() {
    $inputs = $('.base-input__input');
    $autocompleteInputs = $('.base-input-autocomplete');
    console.log($autocompleteInputs);
    

    $inputs.each(function() {
        if ($(this).val().trim() !== '') {
            $(this).addClass('hasValue');
        }

        $(this).on('blur', function() {
            if ($(this).val().trim() !== '') {
                $(this).addClass('hasValue');
            } else {
                $(this).removeClass('hasValue');
            }
        })
    })

    $autocompleteInputs.each(function() {
        var input = $(this).find('input');
        var label = $(this).find('label');


        input.on('focus', function() {
            label.addClass('js-focus')
        })

        input.on('blur', function() {
            label.removeClass('js-focus')
        })
    })
})()