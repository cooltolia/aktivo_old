;
(function () {
    var nav = document.getElementsByClassName("faq-content__question");
    var i;
    var n;

    var question = document.querySelector('.faq-content__question')
    if (!nav || !question) return;

    var questionHeight = question.offsetHeight;

    for (n = 0; n < nav.length; n++) {
        nav[n].style.top = questionHeight * n + 'px';
    };


    for (i = 0; i < nav.length; i++) {
        nav[i].addEventListener("click", function () {

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                var targetID = this.getAttribute("data-for");
                var target = document.querySelector('[data-id=' + targetID + ']');

                /* Toggle between hiding and showing the active panel */
                if (target.style.maxHeight || target.style.maxHeight === '') {
                    target.style.maxHeight = null;
                } else {
                    target.style.maxHeight = target.scrollHeight + "px";
                }

                target.classList.remove('active');
                return; 
            } 

            for (i = 0; i < nav.length; i++) {
                nav[i].classList.remove("active");
            }

            this.classList.add("active");
            var targetID = this.getAttribute("data-for");
            var target = document.querySelector('[data-id=' + targetID + ']');

            var answers = document.querySelectorAll('.faq-content__answer');
            for (i = 0; i < answers.length; i++) {
                answers[i].style.maxHeight = null;
                answers[i].classList.remove('active');
            }

            // target.classList.add('active');

            /* Toggle between hiding and showing the active panel */
            if (target.style.maxHeight) {
                target.style.maxHeight = null;
            } else {
                target.style.maxHeight = target.scrollHeight + "px";
            }
        });
    }
})();