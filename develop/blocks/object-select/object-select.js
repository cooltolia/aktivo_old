;
(function() {
    $('.object-select__slider-cards').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        asNavFor: '.object-select__slider-nav',
        adaptiveHeight: true,

    });
    $('.object-select__slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.object-select__slider-cards',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    centerMode: false,

                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of, a settings object
        ]
    });

})()