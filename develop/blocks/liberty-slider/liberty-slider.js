;(function() {
    var slider = $('.liberty-slider__slider');

    slider.on('init', function (event, slick, currentSlide) {
        var current = $(slick.$slides[slick.currentSlide]);
        var next = current.next();
        var prev = current.prev();

        prev.addClass('slick-sprev');
        next.addClass('slick-snext');
        current.removeClass('slick-snext').removeClass('slick-sprev');

        slick.$prev = prev;
        slick.$next = next;

    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var current = $(slick.$slides[nextSlide]);
        slick.$prev.removeClass('slick-sprev');
        slick.$next.removeClass('slick-snext');

        var next = current.next();
        var prev = current.prev();

        prev.prev();
        prev.next();
        prev.addClass('slick-sprev');
        next.addClass('slick-snext');
        slick.$prev = prev;
        slick.$next = next;

        current.removeClass('slick-next').removeClass('slick-sprev');
    });

    slider.slick({
        speed: 500,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        infinite: true,
        centerMode: true,
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '0',
        swipe: true,
        autoHeight: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });
})();