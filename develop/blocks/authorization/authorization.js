;
(function () {
    var btn = $('.authorization__toggle');
    var btnAccount = $('.authorization__logged');
    var btnAccountMenu = $('.authorization__list');
    btnAccount.on('click', function () {

        btn.toggleClass('active');
        debugger

        if (btnAccountMenu.hasClass('active')) {
            btnAccountMenu.slideUp();
            btnAccountMenu.removeClass('active')
        } else {
            btnAccountMenu.slideDown();
            btnAccountMenu.addClass('active')
        }
    })
})()