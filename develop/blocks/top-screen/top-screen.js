;(function () {

    /* var mouse = $('.top-screen__mouse'),
        mouseTopPosition = mouse.offset().top;

    $(window).on('scroll', function(e) {

        var windowTopPosition = $(window).scrollTop();
        
        mouse.css('transform', 'translate(-50%, -' + windowTopPosition + 'px)');
        mouse.animate({
            opacity: 0
        }, 1500 );
    }) */

    var link = $('.top-screen__button--grey');

    link.on('click', function (e) {
        e.preventDefault();
        var target = $(this.hash);

        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    });


})();
