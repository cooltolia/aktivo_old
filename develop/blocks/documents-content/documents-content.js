;(function() {
    var $titles = $('.documents-content__title');
    var $tables = $('.documents-content__table-wrapper');

    $titles.on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).next().slideUp();
            $(this).removeClass('active');
        } else {
            $(this).next().slideDown();
            $(this).addClass('active');
        }

    })
})();
