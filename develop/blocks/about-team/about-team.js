;(function() {
    $('.about-team__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        dots: false,
        infinite: true,
        // variableWidth: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                // variableWidth: false,
                // centerMode: true,
                // centerPadding: '30px'
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                arrows: false,
            }
        },
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '30px',
                adaptiveHeight: true
            }
        }
    ]
    });

    $('.about-team__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(currentSlide).addClass('active')
    });
})();