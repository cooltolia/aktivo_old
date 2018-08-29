;
(function () {

    var $triggerService = $('.services__item.hasInner');
    var $innerList = $('.services__inner-list');
    var maxHeight = $innerList.outerHeight;

    $triggerService.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $triggerService.toggleClass('active');

        if ($innerList.hasClass("expanded")) {

            $innerList.removeClass("expanded");
            $innerList.slideUp()

            // $innerList.animate({
            //     height: maxHeight
            // }, 500);

        } else {

            $innerList.addClass("expanded");
            $innerList.slideDown()

            // $innerList.animate({
            //     height: $innerList.get(0).scrollHeight
            // }, 500, function () {
            //     $(this).height('auto')
            // });

        }
    });
})();