;
(function () {
    var nav = document.querySelectorAll(".object-content .js-link");
    var commonLabels = document.querySelectorAll('.object-content__label');
    var i;
    var n;

    var label = document.querySelector('.object-content .js-link');
    if (!nav || !label) return;

    var labelHeight = label.offsetHeight;

    
    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
    
    for (n = 0; n < nav.length; n++) {
        nav[n].style.top = labelHeight * n + 'px';
    };
    
    var calcLabel = document.querySelector('.object-content__calculate');
    var calcLabelPosition;

    // var lastLabel = Array.from(commonLabels).pop();
    // var lastLabelPosition;

    // var labelOnScroll = throttle(calcLabelToggle, 100);

    // document.addEventListener('scroll', function () {
    //     labelOnScroll()
    // });


    function calcLabelToggle() {
        calcLabelPosition = calcLabel.getBoundingClientRect().top;
        lastLabelPosition = lastLabel.getBoundingClientRect().top;
        var alreadyFixed = calcLabel.classList.contains('fixed');

        if (calcLabelPosition < 0 && !alreadyFixed) {
           calcLabel.classList.add('fixed');
        } else if (alreadyFixed && lastLabelPosition > -50) {
            calcLabel.classList.remove('fixed')
        }
    }
    

    function smoothScroll(target, duration) {
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, duration);
    }


    var mobile = window.matchMedia("(max-width: 1024px)");

    if (mobile.matches) {

        for (i = 0; i < nav.length; i++) {
            nav[i].addEventListener("click", function (e) {
                e.preventDefault();

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