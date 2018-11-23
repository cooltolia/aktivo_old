;(function() {
    var slider = $('.partner-slider__slider');

    slider.on('init', function (event, slick, currentSlide) {
        var current = $(slick.$slides[slick.currentSlide]);
        var next = current.next();
        var prev = $(slick.$slides[slick.$slides.length - 1]);

        prev.addClass('slick-sprev');
        next.addClass('slick-snext');
        current.removeClass('slick-snext').removeClass('slick-sprev');

        slick.$prev = prev;
        slick.$next = next;

    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        const length = slick.$slides.length;

        var current = $(slick.$slides[nextSlide]);
        slick.$prev.removeClass('slick-sprev');
        slick.$next.removeClass('slick-snext');

        var prev, next;

        if ((nextSlide === (length - 1))) {
            prev = current.prev();
            next = $(slick.$slides[0]);
        } else if (currentSlide > nextSlide && nextSlide === 0) {
            next = current.next();
            prev = $(slick.$slides[length - 1]);
        } else {
            next = current.next();
            prev = current.prev();
        }


        // prev.prev();
        // prev.next();
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
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });

    var sliderAdaptiveHeightMobile = function () {
        slider.find('.slick-slide').height('0');
        slider.find('.slick-slide.slick-active').height('auto');
        slider.find('.slick-list').height('auto');
        slider.slick('setOption', null, null, true);
    }

    // sliderAdaptiveHeightMobile();
})();