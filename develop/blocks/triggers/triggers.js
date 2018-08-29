;(function() {
    var $block = $('.triggers');
    
    function renderTriggers() {
        if ($(this).width() >= 768) {
            var blockHeight = $block.outerHeight();
            $block.css('top', '-' + blockHeight + 'px');
            $block.css('margin-bottom', '-' + blockHeight + 'px');
        } else {
            var blockHeight = $block.outerHeight();
            $block.css('top', '0');
            $block.css('margin-bottom', '0');
        }
    }
 /*    $(window).resize(function() {
        var $window = $(this);

        if ($window.width() > 768  ) {
            var blockHeight = $block.outerHeight();
            $block.css('top', '-' + blockHeight + 'px');
            $block.css('margin-top', '-' + blockHeight + 'px');
        }
    }) */
            
    $(window).on('load resize', renderTriggers)   
})();