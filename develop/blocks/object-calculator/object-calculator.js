; (function () {
    var abc2 = function (n) {
        n += "";
        n = new Array(4 - n.length % 3).join("U") + n;
        return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    };

    var summSlider = $("input#object_summ1-range").rangeslider({
        polyfill: false,
        // Callback function
        onSlide: function (position, value) {
            update(1, value, true)
        },
        onSlideEnd: function (position, value) {
            update(1, value, false)
        }
    });
    var update = function (slider, val, onlyTextUpdate) {
        if (onlyTextUpdate === undefined)
            onlyTextUpdate = false;

        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $vsumm1 = $("#object_summ1-range"),
            income = slider === 1 ? val : $vsumm1.val();

        $("#object_summ1").html(abc2(income));
    };
    update();

    var $sliderWrapper = $('.object-calculator__slider');
    var sliderWrapperHeight = $sliderWrapper.outerHeight(true);

    var $columnForOffset = $('.object-calculator__col.offset-top');
    $columnForOffset.css('margin-top', -sliderWrapperHeight + 'px');

    return {};
})();