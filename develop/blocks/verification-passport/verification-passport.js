;
(function () {

    var $dropdown = $('.verification-passport .tt-dropdown-menu');

    if ($dropdown.length == 0) return;


    new SimpleBar($dropdown[0], {
        autoHide: false
    });

})();