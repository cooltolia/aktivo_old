
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

     
     

     
     

     
     ;(function() {

         $inputs = $('.base-input__input');

         $autocompleteInputs = $('.base-input-autocomplete');

     

         $inputs.each(function() {

             if ($(this).val().trim() !== '') {

                 $(this).addClass('hasValue');

             }

     

             $(this).on('blur', function() {

                 if ($(this).val().trim() !== '') {

                     $(this).addClass('hasValue');

                 } else {

                     $(this).removeClass('hasValue');

                 }

             })

         })

     

         $autocompleteInputs.each(function() {

             var input = $(this).find('input');

             var label = $(this).find('label');

     

     

             input.on('focus', function() {

                 label.addClass('js-focus')

             })

     

             input.on('blur', function() {

                 label.removeClass('js-focus')

             })

         })

     })()

     
     

     
     ;

     (function () {

         var $select = $('.base-select__input');

         var $options = $('.base-select__options-list');

         var $optionsItem = $('.base-select__options-item');

     

         if ($select.length == 0) return; 

         

     

         if ($select.val().trim() !== '') {

             $select.addClass('hasValue');

         }

     

         $select.on('blur', function () {

             if ($select.val().trim() !== '') {

                 $select.addClass('hasValue');

             } else {

                 $select.removeClass('hasValue');

             }

     

         })

     

         $select.on('click', function () {

             $select.parent().addClass('active');

             $options.slideDown();

         })

     

         $(document).on('click', function(e) {

             if ($select.parent().hasClass('active') && e.target !== $select && $select.parent().has(e.target).length === 0) {

                 $select.parent().removeClass("active");

                 $options.slideUp();

             }

         })

     

         $optionsItem.each(function() {

             $(this).on('click', function (e) {

                 var text = $(this).text();

                 $select.val(text);

                 $select.addClass('hasValue');

                 $select.parent().removeClass('active');

                 $options.slideUp();

             })

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

         var $titles = $('.documents-content__title');

         var $tables = $('.documents-content__table-wrapper');

     

         $titles.on('click', function() {

             if ($(this).hasClass('active')) {

                 $(this).next().slideUp();

                 $(this).removeClass('active');

             } else {

                 $(this).next().slideDown();

                 $(this).addClass('active');

             }

     

         })

     })();

     

     
     // ;(function() {

     

     // })();

     
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

     

         if (typeof ymaps == 'undefined') {

             return

         }

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

     
     

     
     (function() {

       var profitData = [2500, 1700, 1200, 1600, 1250, 650];

       var dividendsData = [5, 10, 20, 30, 20, 15];

       var dividendsMax = 35;

       var profitMax = 2500;

     

       var chart = $("#income-monitoring");

     

       if (chart.length) {

         Highcharts.chart("income-monitoring", {

           chart: {

             zoomType: "xy"

           },

           title: {

             text: ""

           },

           exporting: {

             enabled: false

           },

           plotOptions: {

             line: {

               dataLabels: {

                 align: "center",

                 enabled: true,

                 color: "black",

                 padding: 10,

                 style: {

                   textOutline: "none",

                   fontSize: "14px",

                   fontWeight: "400"

                 },

                 formatter: function() {

                   return this.y + "%";

                 }

               }

             }

           },

           xAxis: [

             {

               categories: [

                 "Фев 18",

                 "Мар 18",

                 "Апр 18",

                 "Май 18",

                 "Июн 18",

                 "Июл 18"

               ],

               crosshair: false,

               labels: {

                 style: {

                   color: "rgba(0, 0, 0, 0.4)",

                   fontSize: "9px"

                 }

               }

             }

           ],

           yAxis: [

             {

               visible: false,

               min: 0,

               max: dividendsMax

             },

             {

               max: profitMax,

               title: {

                 text: ""

               },

               labels: {

                 style: {

                   color: "rgba(0, 0, 0, 0.4)",

                   fontSize: "9px"

                 }

               }

             }

           ],

           legend: {

             enabled: false

           },

           credits: {

             enabled: false

           },

           series: [

             {

               name: "Сумма выплат",

               type: "column",

               yAxis: 1,

               data: profitData,

               color: "#3c7bd8",

               tooltip: {

                 valueSuffix: " 000 руб"

               }

             },

             {

               name: "Доходность",

               type: "line",

               data: dividendsData,

               color: "#ffd729",

               tooltip: {

                 valueSuffix: "%"

               }

             }

           ]

         });

       }

     

       var timeline = $("#timelinechart");

       if (timeline.length) {

         setTimeout(() => {

           var scrolledArea = timeline.find(".highcharts-scrolling");

           if (scrolledArea.length === 0) return

           new SimpleBar(scrolledArea[0], {

             autoHide: false

           });

         }, 1000);

     

         var timelineData = [

           {

             name: "First dogs",

             label: "1951: First dogs in space",

             description: "22 July 1951 First dogs in space (Dezik and Tsygan) "

           },

           {

             name: "Sputnik 1",

             label: "1957: First artificial satellite",

             description:

               "4 October 1957 First artificial satellite. First signals from space."

           },

           {

             name: "First human spaceflight",

             label: "1961: First human spaceflight (Yuri Gagarin)",

             description:

               "First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight"

           },

           {

             name: "First human on the Moon",

             label: "1969: First human on the Moon",

             description:

               "First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon"

           },

           {

             name: "First space station",

             label: "1971: First space station",

             description:

               "Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971."

           },

           {

             name: "Apollo–Soyuz Test Project",

             label: "1975: First multinational manned mission",

             description:

               "The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station."

           }

         ];

         var changeColorStep = 100 / timelineData.length;

         var startTimelineColor = "#3c7bd8";

         var timelineColors = [startTimelineColor];

         for (var i = 1; i < timelineData.length; i++) {

             timelineColors.push(shadeColor(timelineColors[i-1], -changeColorStep));

         }

     

         var columnWidth = 120;

         var chartMinWidth = columnWidth * timelineData.length;

         console.log(chartMinWidth);

     

         var startColor = Highcharts.chart("timelinechart", {

           chart: {

             type: "timeline",

             scrollablePlotArea: {

               minWidth: chartMinWidth

             }

           },

           xAxis: {

             visible: false

           },

           yAxis: {

             visible: false

           },

           title: "none",

           colors: timelineColors,

           credits: {

             enabled: false

           },

           series: [

             {

               data: timelineData

             }

           ]

         });

       }

       

       /** just a helper function to calc color for timeline */

       function shadeColor(color, percent) {

         var R = parseInt(color.substring(1, 3), 16);

         var G = parseInt(color.substring(3, 5), 16);

         var B = parseInt(color.substring(5, 7), 16);

     

         R = parseInt((R * (100 + percent)) / 100);

         G = parseInt((G * (100 + percent)) / 100);

         B = parseInt((B * (100 + percent)) / 100);

     

         R = R < 255 ? R : 255;

         G = G < 255 ? G : 255;

         B = B < 255 ? B : 255;

     

         var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);

         var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);

         var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

     

         return "#" + RR + GG + BB;

       }

     })();

     

     
     ;(function() {

         var $togglers = $('.monitoring-objects__nav-item');

         var $sections = $('.monitoring-objects__section');

     

         $togglers.each(function(i, item) {

             $(item).on('click', function() {

     

                 if ($(item).hasClass('active')) {

                     return;

                 }

     

                 var activeToggle = $('.monitoring-objects__nav-item.active');

                 activeToggle.removeClass('active');

     

                 var activeSection = $('.monitoring-objects__section.active');

                 activeSection.removeClass('active').fadeOut();

     

                 var id = $(item).data('for');

                 var target = $('[data-id="' + id + '"');

     

                 $(item).addClass('active');

                 target.addClass('active').fadeIn();

             })

         }) 

     })();

     
     ;(function() {

         var $togglers = $('.monitoring-objects__nav-item');

         var $sections = $('.monitoring-objects__section');

     

         $togglers.each(function(i, item) {

             $(item).on('click', function() {

     

                 if ($(item).hasClass('active')) {

                     return;

                 }

     

                 var activeToggle = $('.monitoring-objects__nav-item.active');

                 activeToggle.removeClass('active');

     

                 var activeSection = $('.monitoring-objects__section.active');

                 activeSection.removeClass('active').fadeOut();

     

                 var id = $(item).data('for');

                 var target = $('[data-id="' + id + '"');

     

                 $(item).addClass('active');

                 target.addClass('active').fadeIn();

             })

         }) 

     })();

     
     ;

     (function () {

         var chart = document.getElementById("monitoring-finances");

     

         if (chart) {

             var objects = [

                 {name: 'Супермаркет Пятерочка', data: 100, color: '#5fce67'},

                 {name: 'Супермаркет Десяточка', data: 30, color: '#3c7bd8'},

                 {name: 'Минимаркет Двоечка', data: 50, color: '#ffd729'},

                 {name: 'Минимаркет Нулевочка', data: 10, color: '#f52f4b'}

             ]

     

     

             // Create the chart

             Highcharts.chart(chart, {

                 chart: {

                     type: "pie",

                     margin: [0, 0, 0, 0],

                     spacingTop: 0,

                     spacingBottom: 0,

                     spacingLeft: 0,

                     spacingRight: 0

                 },

                 credits: {

                     enabled: false

                 },

                 title: {

                     text: ""

                 },

                 plotOptions: {

                     pie: {

                         cursor: 'pointer',

                         dataLabels: {

                             enabled: false,

                         },

                         startAngle: -45,

                         borderColor: null,

                         size: '100%'

                     }

                 },

                 tooltip: {

                     pointFormat: '<b>{point.y} руб</b>',

                     percentageDecimals: 2,

                 },

                 series: [{

                         name: "",

                         data: [

                             {

                                 name: objects[0].name,

                                 y: objects[0].data,

                                 color: objects[0].color

                             },

                             {

                                 name: objects[1].name,

                                 y: objects[1].data,

                                 color: objects[1].color

                             },

                             {

                                 name: objects[2].name,

                                 y: objects[2].data,

                                 color: objects[2].color

                             },

                             {

                                 name: objects[3].name,

                                 y: objects[3].data,

                                 color: objects[3].color

                             },

                         ],

                         innerSize: '83%',

                     }

                 ]

             });

         }

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

     

         var $sliderWrapper = $('.object-calculator__slider');

         var sliderWrapperHeight = $sliderWrapper.outerHeight(true);

     

         var $columnForOffset = $('.object-calculator__col.offset-top');

         $columnForOffset.css('margin-top', -sliderWrapperHeight + 'px');

     

         return {};

     })();

     
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

     
     

     
     ;(function() {

         // var resourceChartElement = document.getElementById("financies-chart");

     

         // if (resourceChartElement) {

         //     var ctx = resourceChartElement.getContext("2d")

     

         //     var grossIncome = 24260353; // Валовый доход

         //     var fee = 2559803; // Комиссия за управление

         //     var debit = 3781927; // Расходы

         //     var operatingProfit = grossIncome - debit; // Чистый операционный доход

         //     var availableEarnest = operatingProfit - fee; // Прибыль к распределению

     

         //     var formattedGrossIncome = abc2(grossIncome);

         //     formattedGrossIncome = formattedGrossIncome + ' ₽';

     

         //     function abc2(n) {

         //         n += "";

         //         n = new Array(4 - n.length % 3).join("U") + n;

         //         return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");

         //     };

     

         //     Chart.pluginService.register({

         //         beforeDraw: function (chart) {

         //             if (chart.config.options.elements.center) {

         //                 //Get ctx from string

         //                 var ctx = chart.chart.ctx;

     

         //                 //Get options from the center object in options

         //                 var centerConfig = chart.config.options.elements.center;

         //                 var fontStyle = centerConfig.fontStyle || 'Arial';

         //                 var txt = centerConfig.text;

         //                 var color = centerConfig.color || '#000';

         //                 var sidePadding = centerConfig.sidePadding || 20;

         //                 var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

     

         //                 ctx.font = 'normal 16px ' + fontStyle;

     

         //                 ctx.textAlign = 'center';

         //                 ctx.textBaseline = 'middle';

         //                 var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);

         //                 var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2 - 12);

         //                 ctx.fillStyle = color;

     

         //                 var lines = txt.split('\n');

         //                 var lineheight = 25;

     

         //                 for (var i = 0; i < lines.length; i++)

         //                     if (i === lines.length - 1) {

         //                         ctx.font = "bold 18px " + fontStyle;

         //                         ctx.fillText(lines[i], centerX, centerY + (i * lineheight));

         //                     } else {

         //                         ctx.fillText(lines[i], centerX, centerY + (i * lineheight));

         //                     }

         //             }

         //         }

         //     });

     

         //     var resourceChart = new Chart(ctx, {

         //         type: "doughnut",

         //         data: {

         //             labels: [

         //                 "Комиссия за управление",

         //                 "Прибыль к распределению",

         //                 "Чистый операционный доход",

         //                 "Расходы"

         //             ],

         //             datasets: [{

         //                     backgroundColor: [

         //                         "#3c7bd8",

         //                         "#ffd729",

         //                         "#5fce67",

         //                         "#f52f4b",

         //                     ],

         //                     hoverBackgroundColor: [

         //                         "#3c7bd8",

         //                         "#ffd729",

         //                         "#5fce67",

         //                         "#f52f4b",

         //                     ],

         //                     data: [

         //                         0,

         //                         0,

         //                         operatingProfit,

         //                         debit,

         //                     ],

         //                     borderWidth: 0

         //                 },

         //                 {

         //                     backgroundColor: [

         //                         "#3c7bd8",

         //                         "#ffd729",

         //                         "#5fce67",

         //                         "#f52f4b",

         //                     ],

         //                     hoverBackgroundColor: [

         //                         "#3c7bd8",

         //                         "#ffd729",

         //                         "#5fce67",

         //                         "#f52f4b",

         //                     ],

         //                     data: [

         //                         fee,

         //                         availableEarnest,

         //                     ],

         //                     borderWidth: 0

         //                 }

         //             ],

         //         },

         //         options: {

         //             legend: {

         //                 display: false

         //             },

         //             elements: {

         //                 center: {

         //                     text: 'Валовый доход \n' + formattedGrossIncome,

         //                     fontStyle: 'Segoe UI',

         //                     sidePadding: 20

         //                 }

         //             },

         //             tooltips: {

         //                 callbacks: {

         //                     label: function (tooltipItem, data) {

     

         //                         var dataset = data.datasets[tooltipItem.datasetIndex];

         //                         //calculate the total of this data set

         //                         var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {

         //                             return previousValue + currentValue;

         //                         });

         //                         //get the current items value

         //                         var currentValue = dataset.data[tooltipItem.index];

         //                         var currentLabel = data.labels[tooltipItem.index];

         //                         //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number

         //                         var formattedValue = abc2(currentValue);

         //                         return currentLabel + ': ' + formattedValue + " ₽";

         //                     }

     

         //                 }

         //             },

         //             rotation: (-0.5 * Math.PI) - (50 / 180 * Math.PI),

         //             cutoutPercentage: 65,

         //             maintainAspectRatio: false

         //         }

         //     });

         // }

     

         /*

         

         ------- NEW REALIZATION -------

     

         */

     

         var chart = document.getElementById("financies-chart");

     

         if (chart) {

             var grossIncome = 24260353; // Валовый доход

             var fee = 2559803; // Комиссия за управление

             var debit = 3781927; // Расходы

             var operatingProfit = grossIncome - debit; // Чистый операционный доход

             var availableEarnest = operatingProfit - fee; // Прибыль к распределению

     

     

             // Create the chart

             Highcharts.chart(chart, {

                 chart: {

                     type: "pie",

                     margin: [0, 0, 0, 0]

                 },

                 credits: {

                     enabled: false

                 },

                 title: {

                     text: ""

                 },

                 plotOptions: {

                     pie: {

                         cursor: 'pointer',

                         dataLabels: {

                             enabled: false,

                         },

                         startAngle: -90,

                         borderColor: null,

                         size: '100%'

                     }

                 },

                 tooltip: {

                     pointFormat: '<b>{point.y} руб</b>',

                     percentageDecimals: 2,

                 },

                 series: [{

                         name: "",

                         data: [{

                                 name: "Расходы",

                                 y: debit,

                                 color: '#f52f4b'

                             },

                             {

                                 name: "Чистый операционный доход",

                                 y: operatingProfit,

                                 color: '#5fce67'

                             },

                         ],

                         innerSize: '83%',

                         index: 1

                     },

                     {

                         name: "second",

                         data: [{

                                 name: "Расходы",

                                 y: debit,

                                 color: '#f52f4b'

                             },

                             {

                                 name: "Комиссия",

                                 y: fee,

                                 color: '#3c7bd8'

                             },

                             {

                                 name: "Прибыль к распределению",

                                 y: availableEarnest,

                                 color: '#ffd729'

                             },

                         ],

                         // size: "80%",

                         innerSize: "67%",

                         index: 0

                     }

                 ]

             });

         }

         

     })();

     

     

     
     (function() {

       // var resourceChartElement = document.getElementById("income-chart");

     

       // if (resourceChartElement) {

       //     var ctx = resourceChartElement.getContext("2d")

     

       //     Chart.pluginService.register({

       //         beforeRender: function (chart) {

       //             if (chart.config.options.showAllTooltips) {

       //                 // create an array of tooltips

       //                 // we can't use the chart tooltip because there is only one tooltip per chart

       //                 chart.pluginTooltips = [];

       //                 chart.config.data.datasets.forEach(function (dataset, i) {

       //                     chart.getDatasetMeta(i).data.forEach(function (sector, j) {

       //                         if (sector._datasetIndex > 0) return

       //                         chart.pluginTooltips.push(new Chart.Tooltip({

       //                             _chart: chart.chart,

       //                             _chartInstance: chart,

       //                             _data: chart.data,

       //                             _options: chart.options.tooltips,

       //                             _active: [sector]

       //                         }, chart));

       //                     });

       //                 });

     

       //                 // turn off normal tooltips

       //                 chart.options.tooltips.enabled = false;

       //             }

       //         },

       //         afterDraw: function (chart, easing) {

       //             if (chart.config.options.showAllTooltips) {

       //                 // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once

       //                 if (!chart.allTooltipsOnce) {

       //                     if (easing !== 1)

       //                         return;

       //                     chart.allTooltipsOnce = true;

       //                 }

     

       //                 // turn on tooltips

       //                 chart.options.tooltips.enabled = true;

       //                 Chart.helpers.each(chart.pluginTooltips, function (tooltip) {

     

       //                     // if (tooltip._active[0]._datasetIndex > 0) return;

     

       //                     tooltip.initialize();

       //                     tooltip.update();

       //                     // we don't actually need this since we are not animating tooltips

       //                     tooltip.pivot();

       //                     tooltip.transition(easing).draw();

       //                 });

       //                 chart.options.tooltips.enabled = false;

       //             }

       //         }

       //     })

     

       //     var realLineData = [1.3, 1.08, 0.71, 0.98, 0.78, 0.38]

     

       //     var mixedChart = new Chart(ctx, {

       //         type: 'bar',

       //         data: {

       //             datasets: [{

       //                     label: 'Доходность',

       //                     data: [2100, 1700, 1200, 1600, 1250, 650],

       //                     type: 'line',

       //                     borderColor: '#ffd729',

       //                     pointBackgroundColor: '#ffd729',

       //                     fill: false,

       //                 },

       //                 {

       //                     backgroundColor: '#3c7bd8',

       //                     hoverBackgroundColor: '#3c7bd8',

       //                     label: 'Сумма выплат',

       //                     data: [2100, 1700, 1200, 1600, 1250, 650],

       //                     borderWidth: 0

       //                 },

       //             ],

       //             labels: ['Фев 18', 'Мар 18', 'Апр 18', 'Май 18', 'Июн 18', 'Июл 18']

       //         },

       //         options: {

       //             scales: {

       //                 yAxes: [{

       //                     ticks: {

       //                         fontColor: "rgba(0, 0, 0, 0.4)",

       //                         fontSize: 9,

       //                         padding: 10,

       //                         beginAtZero: true,

       //                     },

       //                     gridLines: {

       //                         drawBorder: false,

       //                     }

       //                 }],

       //                 xAxes: [{

       //                     barThickness: 45,

       //                     gridLines: {

       //                         display: false,

       //                         drawBorder: false,

       //                     },

       //                     ticks: {

       //                         fontColor: "rgba(0, 0, 0, 0.4)",

       //                         fontSize: 9,

       //                     }

       //                 }]

       //             },

       //             legend: {

       //                 display: true,

       //                 position: 'right',

       //                 labels: {

       //                     boxWidth: 16,

       //                     fontSize: 12,

       //                     fontColor: '#000',

       //                     padding: 15,

       //                 }

       //             },

       //             elements: {

       //                 line: {

       //                     tension: 0

       //                 }

       //             },

       //             tooltips: {

       //                 mode: 'x',

       //                 displayColors: false,

       //                 yAlign: 'bottom',

       //                 xAlign: 'center',

       //                 bodyFontColor: '#000',

       //                 bodyFontSize: 14,

       //                 backgroundColor: 'transparent',

       //                 custom: function (tooltip) {

       //                     if (!tooltip) return;

       //                     // disable displaying the color box;

       //                     tooltip.displayColors = false;

       //                 },

       //                 callbacks: {

       //                     label: function (tooltipItem, data) {

       //                         var dataset = data.datasets[tooltipItem.datasetIndex];

       //                         if (tooltipItem.datasetIndex > 0) {

       //                             return dataset.data[tooltipItem.index];

       //                         }

       //                         var label = realLineData[tooltipItem.index];

     

       //                         return label;

       //                     },

       //                     // remove title

       //                     title: function (tooltipItem, data) {

       //                         if (tooltipItem.datasetIndex > 0) {

       //                             return dataset.data[tooltipItem.index];

       //                         } else {

       //                             return null

       //                         }

       //                     }

       //                 }

       //             },

       //             showAllTooltips: true,

       //             maintainAspectRatio: false,

       //             responsive: true

       //         },

     

       //     });

       // }

     

       // var resizeId;

       // $(window).resize(function () {

       //     clearTimeout(resizeId);

       //     resizeId = setTimeout(afterResizing, 100);

       // });

     

       // afterResizing();

     

       // function afterResizing() {

       //     if (resourceChartElement) {

       //         var canvaswidth = resourceChartElement.width;

       //         if (canvaswidth <= 500) {

     

       //             mixedChart.options.legend.display = false;

       //         } else {

       //             mixedChart.options.legend.display = true;

       //         }

       //         mixedChart.update();

       //     }

       // }

     

       /* 

         --------------------------------------------------

     

         NEW REALIZATION

     

         --------------------------------------------------

         

         */

     

       (function() {

         var profitData = [

           2100,

           1700,

           1200,

           1600,

           1250,

           650,

           2100,

           1700,

           1200,

           1600,

           1250,

           650,

           2100,

           1700,

           1200,

           1600,

           1250,

           650,

           2100,

           1700

         ];

         var dividendsData = [

           1.3,

           1.08,

           0.71,

           0.98,

           0.78,

           0.38,

           1.3,

           1.08,

           0.71,

           0.98,

           0.78,

           0.38,

           1.3,

           1.08,

           0.71,

           0.98,

           0.78,

           0.38

         ];

     

         var chart = $("#income-chart");

     

         if (chart.length) {

           var columnWidth = 25;

           var chartMinWidth = columnWidth * dividendsData.length * 1.5;

           console.log(chartMinWidth);

     

           setTimeout(() => {

             new SimpleBar(chart.find(".highcharts-scrolling")[0], {

               autoHide: false

             });

           }, 1000);

     

           Highcharts.chart("income-chart", {

             chart: {

               zoomType: "xy",

               scrollablePlotArea: {

                 minWidth: chartMinWidth

               }

             },

             title: {

               text: ""

             },

             exporting: {

               enabled: false

             },

             plotOptions: {

               line: {

                 dataLabels: {

                   align: "center",

                   enabled: true,

                   color: "black",

                   padding: 10,

                   style: {

                     textOutline: "none",

                     fontSize: "14px",

                     fontWeight: "400"

                   }

                 }

               }

               // column: {

               //     pointWidth: columnWidth

               // }

             },

             xAxis: [

               {

                 categories: [

                   "Фев 18",

                   "Мар 18",

                   "Апр 18",

                   "Май 18",

                   "Июн 18",

                   "Июл 18"

                 ],

                 crosshair: false,

                 labels: {

                   style: {

                     color: "rgba(0, 0, 0, 0.4)",

                     fontSize: "9px"

                   }

                 },

                 min: 0,

                 // max: 8,

                 scrollbar: {

                   enabled: true,

                   barBackgroundColor: "#ffd729",

                   barBorderRadius: 2,

                   barBorderWidth: 0,

                   buttonBackgroundColor: "transparent",

                   buttonBorderWidth: 0,

                   buttonArrowColor: "transparent",

                   buttonBorderRadius: 0,

                   rifleColor: "transparent",

                   trackBackgroundColor: "#e9e9e9",

                   trackBorderWidth: 0,

                   height: 4

                 }

               }

             ],

             yAxis: [

               {

                 visible: false,

                 softMax: 1.3

               },

               {

                 title: {

                   text: ""

                 },

                 labels: {

                   style: {

                     color: "rgba(0, 0, 0, 0.4)",

                     fontSize: "9px"

                   }

                 },

                 opposite: false,

                 visible: true,

                 tickInterval: 10,

                 softMax: 2200

               }

             ],

             legend: {

               enabled: false

             },

             credits: {

               enabled: false

             },

             series: [

               {

                 name: "Сумма выплат",

                 type: "column",

                 yAxis: 1,

                 data: profitData,

                 color: "#3c7bd8",

                 tooltip: {

                   valueSuffix: " 000 руб"

                 },

                 states: {

                   inactive: {

                     opacity: 0.8

                   }

                 }

               },

               {

                 name: "Доходность",

                 type: "line",

                 data: dividendsData,

                 color: "#ffd729",

                 tooltip: {

                   valueSuffix: "млн руб"

                 },

                 states: {

                   inactive: {

                     opacity: 0.8

                   }

                 }

               }

             ]

           });

         }

       })();

     })();

     

     
     

     
     ; (function () {

         var zoom = 16;

         var adress = [55.747115, 37.539078];

     

         if (typeof ymaps == 'undefined') {

             return

         }

     

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

     (function () {

         $('.object-planning__images').slick({

         slidesToShow: 1,

         slidesToScroll: 1,

         arrows: true,

         fade: true,

         // autoplay: true,

         // autoplaySpeed: 3000,

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

     
     

     
     (function() {

         var objectTable = $('.object-table__table');

         if (objectTable.length === 0) return;

     

         console.log(objectTable.parent().width())

     

         if (objectTable.width() > objectTable.parent().width()) {

             new SimpleBar(objectTable.parent()[0], {

               autoHide: false

             });

         }

     })();

     
     

     
     // ;(function() {

     

     // })();

     
     // ;(function() {

     

     // })();

     
     // ;(function() {

     

     // })();

     
     

     
     ;(function() {

         var slider = $('.partner-slider__slider');

     

         slider.on('init', function (event, slick, currentSlide) {

             var current = $(slick.$slides[slick.currentSlide]);

             var next = current.next();

             var prev = $(slick.$slides[slick.$slides.length - 1]);

     

             prev.addClass('slick-sprev');

             next.addClass('slick-snext');

             current.removeClass('slick-snext').removeClass('slick-sprev');

     

             slick.$prev = prev;

             slick.$next = next;

     

         }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

             const length = slick.$slides.length;

     

             var current = $(slick.$slides[nextSlide]);

             slick.$prev.removeClass('slick-sprev');

             slick.$next.removeClass('slick-snext');

     

             var prev, next;

     

             if ((nextSlide === (length - 1))) {

                 prev = current.prev();

                 next = $(slick.$slides[0]);

             } else if (currentSlide > nextSlide && nextSlide === 0) {

                 next = current.next();

                 prev = $(slick.$slides[length - 1]);

             } else {

                 next = current.next();

                 prev = current.prev();

             }

     

     

             // prev.prev();

             // prev.next();

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

             adaptiveHeight: true,

             // autoplay: true,

             // autoplaySpeed: 3000,

         });

     

         var sliderAdaptiveHeightMobile = function () {

             slider.find('.slick-slide').height('0');

             slider.find('.slick-slide.slick-active').height('auto');

             slider.find('.slick-list').height('auto');

             slider.slick('setOption', null, null, true);

         }

     

         // sliderAdaptiveHeightMobile();

     })();

     
     ;(function() {

     

         new WOW().init();

     

     })();

     
     

     
     (function() {

         var partnersContent = $('.partners-content');

         if (partnersContent.length === 0) return;

     

         var charts = $('.partners-content__chart');

     

         charts.each(function() {

             var id = $(this).attr('id');

             var data = $(this).data('values');

     

             chartInit(id, data);

         });

     

         function chartInit(selector, data) {

             return new Highcharts.chart(selector, {

                 chart: {

                     type: 'column',

                     backgroundColor: 'rgba(255, 255, 255, 0)'

                 },

                 credits: {

                     enabled: false

                 },

                 title: {

                     text: ''

                 },

                 colors: ['#3C7BD8'],

                 legend: false,

                 xAxis: {

                     categories: ['Переходы', 'Регистрации', 'Сделки'],

                     labels: {

                         style: {

                             fontSize: '9px'

                         }

                     }

                 },

                 yAxis: {

                     min: 0,

                     title: {

                         text: ''

                     },

                     labels: {

                         enabled: false

                     }

                 },

                 plotOptions: {

                     // column: {},

                     column: {

                         dataLabels: {

                             enabled: true,

                             padding: 0,

                             style: {

                                 color: '#000000',

                                 fontSize: '12px',

                                 fontWeight: '700'

                             }

                         }

                         //

                     }

                 },

                 series: [

                     {

                         name: 'Количество',

                         data: data

                     }

                 ]

             });

         }

     

         var copyIputButton = $('.partners-content__copy');

     

         copyIputButton.on('click', function(e) {

             e.preventDefault();

             var btn = $(this);

     

             btn.addClass('clicked');

             btn.prop('disabled', true);

     

             var inputToCopy = btn.prev().find('input')[0];

             inputToCopy.disabled = false;

             inputToCopy.select();

             inputToCopy.setSelectionRange(0, 99999);

             document.execCommand('copy');

             inputToCopy.disabled = true;

     

             setTimeout(function() {

                 btn.removeClass('clicked');

                 btn.prop('disabled', false);

             }, 500);

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

     
     

     
     

     
     

     
     

     
     

     
     

     
     ;

     (function () {

     

         var $dropdown = $('.verification-passport .tt-dropdown-menu');

     

         if ($dropdown.length == 0) return;

     

     

         new SimpleBar($dropdown[0], {

             autoHide: false

         });

     

     })();

     
     ;(function() {

     

         function initNewDropZone(target) {

             var dropz = new Dropzone(target, {

                 url: "upload.php",

                 maxFiles: 1,

                 maxFilesize: 10,

                 addRemoveLinks: true,

                 thumbnailWidth: "190",

                 thumbnailHeight: "250",

             });

     

     

             dropz.on("removedfile", function (file) {

                

             })

     

             // dropz.on("totaluploadprogress", function (progress) {

             //     var progr = document.querySelector(".progress .determinate");

             //     if (progr === undefined || progr === null) return;

     

             //     progr.style.width = progress + "%";

             // });

     

             dropz.on('uploadprogress', function (file) {

                 var $add = $(file.previewElement).siblings('.add');

                 var $progressBar = $(file.previewElement).find('.dz-upload');

     

                 $progressBar.css('opacity', 1);

                 // $add.css('opacity', 0);

             })

     

             dropz.on('success', function (file) {

                 var $progressBar = $(file.previewElement).find('.dz-upload');

     

                 $progressBar.css('opacity', 0);

             })

     

             dropz.on('error', function (file) {

                 var $progressBar = $(file.previewElement).find('.dz-upload');

     

                 $progressBar.css('opacity', 0);

             })

         }

     

         $('.verification-upload__form').each(function() {

             console.log($(this));

             

             initNewDropZone($(this)[0]);

         })

     

         

     

     })();

     
     
    
    
});
