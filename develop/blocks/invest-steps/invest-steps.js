;
(function () {
    function initSlider() {
        $('.invest-steps__list').slick({
            mobileFirst: true,
            slidesToShow: 1,
            arrows: false,
            dots: false,
            infinite: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 3000,
            
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2.1,
                        variableWidth: false,
                        centerMode: true,
                        centerPadding: '30px'
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3.05,
                        variableWidth: false,
                        centerMode: true,
                        centerPadding: '30px'
                    }
                },
                {
                    breakpoint: 1240,
                    settings: 'unslick'
                }
    
            ]
        });
    }
    
    initSlider();

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var myEfficientFn = debounce(function () {
        if (!($('.invest-steps__list').hasClass('slick-initialized')))
            initSlider();
    }, 250);

    window.addEventListener('resize', myEfficientFn);
    // $('.invest-steps__list').on('setPosition', function () {
    //     $(this).find('.slick-slide').height('auto');
    //     var slickTrack = $(this).find('.slick-track');
    //     var slickTrackHeight = $(slickTrack).height();
    //     $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
    // });

})();