;(function () {

    $('.cases__list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

})();