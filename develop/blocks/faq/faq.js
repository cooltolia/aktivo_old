;(function () {

    var $answer = $('.faq__answer');
    var $question = $('.faq__question');

    $question.on('click', function () {
        $(this).addClass('active');

        var $nextAnswer = $(this).next('.faq__answer');

        $question.not($(this)).each(function () {
            $(this).removeClass('active');
        });

        $answer.not($nextAnswer).each(function () {
            $(this).removeClass('active');
            $(this).slideUp(250);
        });

        if ($nextAnswer.hasClass('active')) {
            
            $(this).removeClass('active');
            $nextAnswer.removeClass('active');
            $nextAnswer.slideUp(250);
            return;
        }

        $nextAnswer.addClass('active');
        $nextAnswer.slideDown(250  );

    });

})();