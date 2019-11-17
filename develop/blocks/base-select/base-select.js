;
(function () {
    var $select = $('.base-select__input');
    var $options = $('.base-select__options-list');
    var $optionsItem = $('.base-select__options-item');

    if ($select.length == 0) return; 
    

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

    $(document).on('click', function(e) {
        if ($select.parent().hasClass('active') && e.target !== $select && $select.parent().has(e.target).length === 0) {
            $select.parent().removeClass("active");
            $options.slideUp();
        }
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