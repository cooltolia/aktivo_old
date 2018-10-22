;
(function () {
    var nav = document.querySelectorAll(".object-content .js-link");
    var i;
    var n;

    var question = document.querySelector('.object-content .js-link');
    if (!nav || !question) return;

    var questionHeight = question.offsetHeight;

    for (n = 0; n < nav.length; n++) {
        nav[n].style.top = questionHeight * n + 'px';
    };

    function smoothScroll(target, duration) {
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, duration);
    }


    var mobile = window.matchMedia("(max-width: 1024px)");

    if (mobile.matches) {

        for (i = 0; i < nav.length; i++) {
            nav[i].addEventListener("click", function () {

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    var targetID = this.getAttribute("href");
                    var target = document.querySelector(targetID);

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
                debugger;
                var targetID = this.getAttribute("href");
                var target = document.querySelector(targetID);

                var blocks = document.querySelectorAll('.object-content__block');
                for (i = 0; i < blocks.length; i++) {
                    blocks[i].style.maxHeight = null;
                    blocks[i].classList.remove('active');
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
    } else {
        nav.forEach(function (elem) {
            elem.addEventListener("click", function () {
                for (i = 0; i < nav.length; i++) {
                    nav[i].classList.remove("active");
                }

                this.classList.add("active");

                var targetID = this.getAttribute("href");
                var target = document.querySelector(targetID);
                smoothScroll(target, 500);
            });
        });
    }

    $('.object-content__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    });
    
})();