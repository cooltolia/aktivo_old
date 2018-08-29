;
(function () {

    var $mobileNav = $('.mobile-nav');
        
        
    $(".hamburger").click(function () {
        /** hide all visible inner menus */

        $(this).toggleClass('active');
        $mobileNav.toggleClass('active')

        if ($mobileNav.hasClass('active')) {
            $mobileNav.fadeIn();
            $('body').css('overflow', 'hidden');
        } else {
            $mobileNav.fadeOut();
            $('body').css('overflow', 'auto');
        }
    });

})();
