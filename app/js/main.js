
$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

     ;(function() {

     

     })();

     
     

     
     

     
     ;(function() {

         $('.about-team__slider').slick({

             slidesToShow: 4,

             slidesToScroll: 2,

             arrows: true,

             dots: false,

             infinite: true,

             // variableWidth: true,

             // autoplay: true,

             // autoplaySpeed: 3000,

             responsive: [{

                 breakpoint: 1200,

                 settings: {

                     slidesToShow: 3,

                     // variableWidth: false,

                     // centerMode: true,

                     // centerPadding: '30px'

                 }

             },

             {

                 breakpoint: 769,

                 settings: {

                     slidesToShow: 2,

                     arrows: false,

                 }

             },

             {

                 breakpoint: 481,

                 settings: {

                     slidesToShow: 1,

                     slidesToScroll: 1,

                     arrows: false,

                     centerMode: true,

                     centerPadding: '30px',

                     adaptiveHeight: true

                 }

             }

         ]

         });

     

         $('.about-team__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

             $(currentSlide).addClass('active')

         });

     })();

     
     

     
     

     
     

     
     ;

     (function () {

         var btn = $('.authorization__toggle');

         var btnAccount = $('.authorization__logged');

         var btnAccountMenu = $('.authorization__list');

         btnAccount.on('click', function () {

     

             btn.toggleClass('active');

     

             if (btnAccountMenu.hasClass('active')) {

                 btnAccountMenu.slideUp();

                 btnAccountMenu.removeClass('active')

             } else {

                 btnAccountMenu.slideDown();

                 btnAccountMenu.addClass('active')

             }

         })

     })()

     
     

     
     ;

     (function () {

         $chart = $('#top_x_div');

         if ($chart.length === 0) return;

     

         var percentFormatFunction = d3.format(".2f"),

             yearFormatter = function (year) {

                 switch (parseInt(year)) {

                     case 1:

                         return "1 год";

                     case 2:

                     case 3:

                     case 4:

                         return year + " года";

                     default:

                         return year + " лет";

                 }

     

             };

         /** add probel num **/

         var abc2 = function (n) {

             n += "";

             n = new Array(4 - n.length % 3).join("U") + n;

             return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");

         };

         var chart = new Highcharts.chart('top_x_div', {

                 chart: {

                     type: 'column',

                     backgroundColor: 'rgba(255, 255, 255, 0)'

                 },

                 title: {

                     text: ''

                 },

                 colors: ['#e7acee', '#f0d561', '#8589f8', '#aaed96'],

                 legend: {

                     align: 'left',

                     itemDistance: 20,

                     itemStyle: {

                         font: '12px "Segoe UI"',

                         color: '#000'

                     },

                     useHTML: true,

                     labelFormatter: function () {

                         return '<span title="' + this.name + '"><span class="gals"></span>' + this.name + '</span>';

                     }

                 },

                 xAxis: {

                     categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027',

                         '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039',

                         '2040', '2041'

                     ]

                 },

                 yAxis: {

                     min: 0,

                     title: {

                         text: ''

                     }

                 },

                 tooltip: {

                     pointFormatter: function () {

                         var seriesName = this.series.name,

                             lastSeries = this.series.chart.series.slice(-1)[0],

                             lastSeriesBasePointValue = lastSeries.data[0].y,

                             percentage = this.series.index === 1 || this.series.index === 3 ? "" :

                             percentFormatFunction((this.y / lastSeriesBasePointValue) * 100) + '%';

     

                         return '<div class="row">' +

                             '<div class="label">' + seriesName + '</div>' +

                             '<div class="proc">' + percentage + '</div>' +

                             '<div class="income">' + abc2(this.y) + '  р.</div>' +

                             '</div>';

                     },

                     shared: true,

                     useHTML: true,

                     valueDecimal: 0

                 },

                 plotOptions: {

                     column: {

                         stacking: 'total'

                     }

                 },

                 series: [{

                         name: 'Рентный доход',

                         data: []

                     },

                     {

                         name: 'Накопленный рентный доход',

                         data: []

                     },

                     {

                         name: 'Рост стоимости',

                         data: []

                     },

                     {

                         name: 'Стоимость актива',

                         data: []

                     }

                 ]

             }),

             instruments = {

                 'aktivo': {

                     rentKoeff: [0.11, 0.116, 0.121, 0.127, 0.134, 0.140, 0.147, 0.155, 0.163, 0.171],

                     capKoeff: [0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]

                 },

                 'deposit': {

                     rentKoeff: [0.06, 0.06, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],

                     capKoeff: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

                 },

                 'bond': {

                     rentKoeff: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08],

                     capKoeff: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1]

                 },

                 'flat': {

                     rentKoeff: [0.03, 0.0306, 0.0315, 0.0325, 0.0334, 0.0344, 0.0355, 0.0365, 0.0376, 0.0388],

                     capKoeff: [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]

                 }

             };

         var investAmountCalculator = function (years, annual, instrument) {

             var summ = annual;

             for (var i = 0; i < years; i++) {

                 if (i === 0)

                     summ /= instrument.rentKoeff[i];

                 else

                     summ += summ * instrument.capKoeff[i];

             }

             return Math.ceil(summ);

         };

         var investSeriesCalculator = function (annual, years, instrument) {

             var investmentBody = [],

                 rent = [],

                 capitalization = [],

                 accumulatedRent = [];

     

             // year by year calculator

             // for (var i = 0; i < years; i++) {

             //     investmentBody[i] = Math.ceil(annual);

             //     rent[i] = Math.ceil(annual * instrument.rentKoeff[i]);

             //     capitalization[i] = (i == 0 ? 0 : (i == 1) ? Math.ceil(investmentBody[i] * instrument.capKoeff[i]) :

             //             Math.ceil(capitalization[i - 1] / (1 - instrument.capKoeff[i])));

             // }

     

             //with collect

             for (var i = 0; i < years; i++) {

                 investmentBody[i] = (i === 0) ? Math.ceil(annual) : Math.ceil(investmentBody[i - 1] + capitalization[i - 1]);

                 rent[i] = Math.ceil(annual * instrument.rentKoeff[i]);

                 accumulatedRent[i] = (i === 0) ? 0 : (accumulatedRent[i - 1] + rent[i - 1]);

                 capitalization[i] = (i === 0) ? 0 : Math.ceil(investmentBody[i] * instrument.capKoeff[i]);

             }

     

             return {

                 'capitalization': capitalization,

                 'rent': rent,

                 'accumulated_rent': accumulatedRent,

                 'investment': investmentBody

             };

         };

         var summSlider = $("input#summ1-range").rangeslider({

                 polyfill: false,

                 // Callback function

                 onSlide: function (position, value) {

                     update(1, value, true)

                 },

                 onSlideEnd: function (position, value) {

                     update(1, value, false)

                 }

             }),

             yearSlider = $("input#summ2-range").rangeslider({

                 polyfill: false,

                 // Callback function

                 onSlide: function (position, value) {

                     update(2, value, true)

                 },

                 onSlideEnd: function (position, value) {

                     update(2, value, false);

                 }

             });

         //changed. now with parameter

         var update = function (slider, val, onlyTextUpdate) {

             if (onlyTextUpdate === undefined)

                 onlyTextUpdate = false;

     

             //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)

             var $vsumm1 = $("#summ1-range"),

                 income = slider === 1 ? val : $vsumm1.val(),

                 $vsumm2 = $("#summ2-range"),

                 years = slider === 2 ? val : $vsumm2.val(),

                 names = ['aktivo' /*, 'deposit', 'bond', 'flat'*/ ],

                 aktivoInvest = investAmountCalculator(1, income, instruments['aktivo']);

     

             // names.forEach(function (element) {

             //     var instrument = instruments[element],

             //         investSumm = investAmountCalculator(years, income, instrument),

             //         divInvestSumm = $("div#" + element + " .invest-summa");

             //     divInvestSumm.text(investSumm);

             //     divInvestSumm.append("<span class='ruble'/>");

             //     if (element === 'aktivo')

             //         aktivoInvest = investSumm;

             // });

     

             var series = investSeriesCalculator(aktivoInvest, years, instruments['aktivo']);

             if (onlyTextUpdate === false) {

                 chart.series[0].setData(series['rent']);

                 chart.series[1].setData(series['accumulated_rent']);

                 chart.series[2].setData(series['capitalization']);

                 chart.series[3].setData(series['investment']);

             }

     

             var totalRent = series['accumulated_rent'][years - 1] + series['rent'][years - 1],

                 totalRentPercent = totalRent * 100 / aktivoInvest,

                 totalCapitalization = series['capitalization'].reduce(function (a, b) {

                     return a + b;

                 }),

                 totalCapitalizationPercent = (((series['investment'][years - 1] + series['capitalization'][years - 1]) - aktivoInvest) / aktivoInvest) * 100,

                 total = totalRent + series['investment'][years - 1] + series['capitalization'][years - 1],

                 totalPercentage = ((total - aktivoInvest) / aktivoInvest) * 100;

     

             $("#summ2, #vyear").text(yearFormatter(years));

     

             $("#result1").text(abc2(total));

             $("#result1_percent").text("+" + percentFormatFunction(totalPercentage) + "%");

     

             $("#result2").text(abc2(totalRent));

             $("#result2_percent").text("+" + percentFormatFunction(totalRentPercent) + "%");

     

             $("#result3").text(abc2(totalCapitalization));

             $("#result3_percent").text("+" + percentFormatFunction(totalCapitalizationPercent) + "%");

     

             $("#result4").text(abc2(aktivoInvest));

     

             $("#summ1").html(abc2(income));

             $('#summ1-scroll')

                 .find('.rangeslider__handle')

                 .html('<div class="tooltip2">' +

                     '<div class="title">Инвестировать от</div>' +

                     '<div class="summ-t">' + abc2(aktivoInvest) + '<span class="ruble"/></div>' +

                     '</div>');

             if (income >= 1900000) {

                 $("#summ1-scroll").addClass("no-right");

             } else {

                 $("#summ1-scroll").removeClass("no-right");

             }

         };

         update();

         return {};

     })();

     
     ;

     (function () {

         var officeTitles = document.getElementsByClassName("contacts-offices__title");

         var i;

     

         if (!officeTitles) return;

     

     

         for (i = 0; i < officeTitles.length; i++) {

             officeTitles[i].addEventListener("click", function () {

     

                 if (this.classList.contains('active')) {

                     this.classList.remove('active');

                     // debugger;

                     var officeData = this.nextElementSibling;

     

                     /* Toggle between hiding and showing the active panel */

                     if (officeData.style.maxHeight || officeData.style.maxHeight === '') {

                         officeData.style.maxHeight = null;

                     } else {

                         officeData.style.maxHeight = officeData.scrollHeight + "px";

                     }

     

                     officeData.classList.remove('active');

                     return;

                 }

     

                 for (i = 0; i < officeTitles.length; i++) {

                     officeTitles[i].classList.remove("active");

                 }

     

                 this.classList.add("active");

                 var officeData = this.nextElementSibling;

     

                 var otherDatas = document.querySelectorAll('.contacts-offices__data');

                 for (i = 0; i < otherDatas.length; i++) {

                     otherDatas[i].style.maxHeight = null;

                     otherDatas[i].classList.remove('active');

                 }

     

                 // officeData.classList.add('active');

     

                 /* Toggle between hiding and showing the active panel */

                 if (officeData.style.maxHeight) {

                     officeData.style.maxHeight = null;

                 } else {

                     officeData.style.maxHeight = officeData.scrollHeight + "px";

                 }

             });

         }

     })();

     
     ;(function() {

     

     })();

     
     

     
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

     

     
     

     
     

     
     

     
     

     
     ;

     (function () {

         function initSlider() {

             $('.invest-steps__list').slick({

                 mobileFirst: true,

                 slidesToShow: 1,

                 arrows: false,

                 dots: false,

                 infinite: true,

                 variableWidth: true,

                 autoplay: true,

                 autoplaySpeed: 3000,

                 

                 responsive: [{

                         breakpoint: 768,

                         settings: {

                             slidesToShow: 2.1,

                             variableWidth: false,

                             centerMode: true,

                             centerPadding: '30px'

                         }

                     },

                     {

                         breakpoint: 1024,

                         settings: {

                             slidesToShow: 3.05,

                             variableWidth: false,

                             centerMode: true,

                             centerPadding: '30px'

                         }

                     },

                     {

                         breakpoint: 1240,

                         settings: 'unslick'

                     }

         

                 ]

             });

         }

         

         initSlider();

     

         function debounce(func, wait, immediate) {

             var timeout;

             return function () {

                 var context = this,

                     args = arguments;

                 var later = function () {

                     timeout = null;

                     if (!immediate) func.apply(context, args);

                 };

                 var callNow = immediate && !timeout;

                 clearTimeout(timeout);

                 timeout = setTimeout(later, wait);

                 if (callNow) func.apply(context, args);

             };

         };

     

         var myEfficientFn = debounce(function () {

             if (!($('.invest-steps__list').hasClass('slick-initialized')))

                 initSlider();

         }, 250);

     

         window.addEventListener('resize', myEfficientFn);

         // $('.invest-steps__list').on('setPosition', function () {

         //     $(this).find('.slick-slide').height('auto');

         //     var slickTrack = $(this).find('.slick-track');

         //     var slickTrackHeight = $(slickTrack).height();

         //     $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');

         // });

     

     })();

     
     

     
     ;(function() {

         var slider = $('.liberty-slider__slider');

     

         slider.on('init', function (event, slick, currentSlide) {

             var current = $(slick.$slides[slick.currentSlide]);

             var next = current.next();

             var prev = current.prev();

     

             prev.addClass('slick-sprev');

             next.addClass('slick-snext');

             current.removeClass('slick-snext').removeClass('slick-sprev');

     

             slick.$prev = prev;

             slick.$next = next;

     

         }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

             var current = $(slick.$slides[nextSlide]);

             slick.$prev.removeClass('slick-sprev');

             slick.$next.removeClass('slick-snext');

     

             var next = current.next();

             var prev = current.prev();

     

             prev.prev();

             prev.next();

             prev.addClass('slick-sprev');

             next.addClass('slick-snext');

             slick.$prev = prev;

             slick.$next = next;

     

             current.removeClass('slick-next').removeClass('slick-sprev');

         });

     

         slider.slick({

             speed: 500,

             arrows: true,

             dots: false,

             focusOnSelect: true,

             infinite: true,

             centerMode: true,

             slidesPerRow: 1,

             slidesToShow: 1,

             slidesToScroll: 1,

             centerPadding: '0',

             swipe: true,

             autoHeight: true,

             // autoplay: true,

             // autoplaySpeed: 3000,

         });

     })();

     
     

     
     ;(function() {

     

         new WOW().init();

     

     })();

     
     

     
     

     
     

     
     ;(function(){

         var zoom = 16;

         var adress = [55.747115, 37.539078];

     

         ymaps.ready(function () {

             var myMap;

             

             ymaps.geocode(adress).then(function (res) {

                 myMap = new ymaps.Map('map', {

                     center: res.geoObjects.get(0).geometry.getCoordinates(),

                     zoom: zoom

                 });

                 var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

                     hintContent: 'Пресненская наб., д.8, стр.1',

                 }, {

                         preset: "islands#yellowStretchyIcon",

                     });

     

                 myMap.geoObjects.add(myPlacemark);

                 myMap.behaviors.disable('scrollZoom');

             });

     

         });

     })();

     
     ;(function() {

     

         // $(":input").inputmask();

     

         var $modals = $('.modal');

         

         $modals.each(function () {

             $(this).on("shown.bs.modal", function (event) {

                 var thisId = event.target.getAttribute("id");

                 if (thisId === 'modal2' && typeof (grecaptcha.execute) === 'function') {

                     grecaptcha.execute();

                 } 

                 

                 var firstInput = $(this).find('input')[0];

                 if (firstInput) {

                     firstInput.focus()

                 }

                 

                 var mobileInput = $(this).find('input[name="phone"]'),

                     submit = $(this).find('button[name="submit"]');

                 var isValid = Inputmask.isValid(mobileInput.val(), { inputFormat: "+7 (999) 999 99 99" });

     

                 if (isValid) {

                     submit.attr('disabled', false)

                 }

     

                 mobileInput.inputmask('+7 (999) 999 99 99', {

                     onKeyValidation: function (key, result) {

                         // console.log(result.pos);

                     },

                     oncomplete: function () {

                         submit.attr('disabled', false)

                     },

                     onincomplete: function () {

                         submit.prop('disabled', true)

                     }

                 });

             });

         });

     

         $('#modal5').on('show.bs.modal', function (event) {

             var button = $(event.relatedTarget) // Button that triggered the modal

             var service = button.data('service');

             var buttonText = button.data('button');

             var modal = $(this);

             modal.find('input[name="service"]').val(service);

             modal.find('button[name="submit"]').text(buttonText);

         })

     

     })();

     
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

         return {};

     })();

     
     ;(function() {

     

     })();

     
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

     
     

     
     

     
     ; (function () {

         var zoom = 16;

         var adress = [55.747115, 37.539078];

     

         ymaps.ready(function () {

             var myMap;

     

             ymaps.geocode(adress).then(function (res) {

                 myMap = new ymaps.Map('object-map', {

                     center: res.geoObjects.get(0).geometry.getCoordinates(),

                     zoom: zoom

                 });

                 var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

                     hintContent: 'Пресненская наб., д.8, стр.1',

                 }, {

                         preset: "islands#yellowStretchyIcon",

                     });

     

                 myMap.geoObjects.add(myPlacemark);

                 myMap.behaviors.disable('scrollZoom');

             });

     

         });

     })();

     
     

     
     

     
     

     
     ;

     (function() {

         $('.object-select__slider-cards').slick({

             slidesToShow: 1,

             slidesToScroll: 1,

             arrows: true,

             fade: false,

             asNavFor: '.object-select__slider-nav',

             adaptiveHeight: true,

             // autoplay: true,

             // autoplaySpeed: 3000,

     

         });

         $('.object-select__slider-nav').slick({

             slidesToShow: 4,

             slidesToScroll: 1,

             asNavFor: '.object-select__slider-cards',

             dots: false,

             arrows: false,

             focusOnSelect: true,

             responsive: [

                 {

                     breakpoint: 1240,

                     settings: {

                         slidesToShow: 3,

                     }

                 },

                 {

                     breakpoint: 1024,

                     settings: {

                         slidesToShow: 2,

                         centerMode: true,

                         centerPadding: '5px'

                     }

                 },

                 {

                     breakpoint: 480,

                     settings: {

                         slidesToShow: 1,

                         centerMode: true,

                         centerPadding: '5px'

     

                     }

                 }

             ]

         });

     

     })();

     
     

     
     

     
     

     
     ;(function() {

         var slider = $('.security-slider__slider');

     

         slider.on('init', function (event, slick, currentSlide) {

             var current = $(slick.$slides[slick.currentSlide]);

             var next = current.next();

             var prev = current.prev();

     

             prev.addClass('slick-sprev');

             next.addClass('slick-snext');

             current.removeClass('slick-snext').removeClass('slick-sprev');

     

             slick.$prev = prev;

             slick.$next = next;

     

         }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

             var current = $(slick.$slides[nextSlide]);

             slick.$prev.removeClass('slick-sprev');

             slick.$next.removeClass('slick-snext');

     

             var next = current.next();

             var prev = current.prev();

     

             prev.prev();

             prev.next();

             prev.addClass('slick-sprev');

             next.addClass('slick-snext');

             slick.$prev = prev;

             slick.$next = next;

     

             current.removeClass('slick-next').removeClass('slick-sprev');

         });

         // .on('afterChange', function (event, slick, currentSlide, nextSlide) {

         //     slick.animateHeight();

         // });

     

         slider.slick({

             speed: 500,

             arrows: true,

             dots: false,

             focusOnSelect: true,

             infinite: true,

             centerMode: true,

             slidesPerRow: 1,

             slidesToShow: 1,

             slidesToScroll: 1,

             centerPadding: '0',

             swipe: true,

             // adaptiveHeight: true,

             // autoplay: true,

             // autoplaySpeed: 3000,

         });

     })();

     
     

     
     

     
     ;(function() {

     

     })();

     
     

     
     

     
     

     
     

     
     

     
     ;

     (function () {

         var vacancyTitles = document.getElementsByClassName("vacancies__title");

         var i;

        

         if (!vacancyTitles) return;

     

     

         for (i = 0; i < vacancyTitles.length; i++) {

             vacancyTitles[i].addEventListener("click", function () {

     

                 if (this.classList.contains('active')) {

                     this.classList.remove('active');

                     // debugger;

                     var vacancyDescription = this.nextElementSibling;

     

                     /* Toggle between hiding and showing the active panel */

                     if (vacancyDescription.style.maxHeight || vacancyDescription.style.maxHeight === '') {

                         vacancyDescription.style.maxHeight = null;

                     } else {

                         vacancyDescription.style.maxHeight = vacancyDescription.scrollHeight + "px";

                     }

     

                     vacancyDescription.classList.remove('active');

                     return;

                 }

     

                 for (i = 0; i < vacancyTitles.length; i++) {

                     vacancyTitles[i].classList.remove("active");

                 }

     

                 this.classList.add("active");

                 var vacancyDescription = this.nextElementSibling;

     

                 var otherDescriptions = document.querySelectorAll('.vacancies__description');

                 for (i = 0; i < otherDescriptions.length; i++) {

                     otherDescriptions[i].style.maxHeight = null;

                     otherDescriptions[i].classList.remove('active');

                 }

     

                 // vacancyDescription.classList.add('active');

     

                 /* Toggle between hiding and showing the active panel */

                 if (vacancyDescription.style.maxHeight) {

                     vacancyDescription.style.maxHeight = null;

                 } else {

                     vacancyDescription.style.maxHeight = vacancyDescription.scrollHeight + "px";

                 }

             });

         }

     })();
    
    
});
