;(function() {
    var $togglers = $('.monitoring-objects__nav-item');
    var $sections = $('.monitoring-objects__section');

    $togglers.each(function(i, item) {
        $(item).on('click', function() {

            if ($(item).hasClass('active')) {
                return;
            }

            var activeToggle = $('.monitoring-objects__nav-item.active');
            activeToggle.removeClass('active');

            var activeSection = $('.monitoring-objects__section.active');
            activeSection.removeClass('active').fadeOut();

            var id = $(item).data('for');
            var target = $('[data-id="' + id + '"');

            $(item).addClass('active');
            target.addClass('active').fadeIn();
        })
    }) 
})();