
$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

     

     
     

     
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

     
     

     
     ;

     (function () {

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

     
     

     
     

     
     (function () {

         /** main-nav scripts */

     

     

         /** mobile-nav scripts */

         var $mobileNav = $('.mobile-nav'),

             $firstLevelLinks = $('.mobile-nav__link'),

             $secondLevelLinks = $('.mobile-nav__sublink');

     

         $firstLevelLinks.each(function () {

             if ($(this).next('ul').length > 0)

                 $(this).addClass('has-submenu');

         })

     

         $firstLevelLinks.on('click', function (e) {

             var $subMenu = $(this).next();

     

             if ($subMenu.length > 0) {

                 e.preventDefault();

                 e.stopPropagation()

     

                 $subMenu.toggleClass('opened');

                 $(this).addClass('has-submenu');

                 $(this).toggleClass('opened');

     

                 if ($subMenu.hasClass('opened')) {

                     $subMenu.slideDown();

                 } else {

                     $subMenu.slideUp();

                 }

             } else {

                 return;

             }

     

         });

     

         $secondLevelLinks.on('click', function (e) {

             e.preventDefault();

             e.stopPropagation()

             var $thirdMenu = $(this).next();

             $thirdMenu.toggleClass('opened')

     

     

             if ($thirdMenu.hasClass('opened')) {

                 $thirdMenu.slideDown();

             } else {

                 $thirdMenu.slideUp();

             }

         });

     })()

     
     $(window).on('load', function() {

         var zoom = 17;

         var myMap;

         if ($(window).width() < 480) {

             zoom = 16;

         }

     

         var address;

         address = [55.772405830765955, 37.63848997486877];

         var $map = $('#map');

         var $mapFallback = $('.map__fallback');

     

         /** popup */

     

         var $header = $('.map__info-header'),

             $body = $('.map__info-body');

     

         if ($(window).width() <= '767') {

             $header.on('click', function () {

     

                 if ($header.hasClass('js-expanded')) {

                     $body.slideUp();

                     $header.removeClass('js-expanded');

                 } else {

                     $header.addClass('js-expanded');

                     $body.slideDown();

                 }

             })

         }

     

         //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки)

         var check_if_load = false;

         var TRY = 1

         function init() { 

             if (ymaps.geocode === undefined) {

                 // console.log('Попытка номер ' + TRY);

                 TRY++

                 return ymap();

             }

     

             ymaps.ready(function() {

                 ymaps.geocode(address).then(function (res) {

                     myMap = new ymaps.Map('map', {

                         center: res.geoObjects.get(0).geometry.getCoordinates(),

                         zoom: zoom

                     });

     

                     var pointA = [55.77295318071541, 37.63288889128495],

                         pointB = address;

     

                     multiRoute = new ymaps.multiRouter.MultiRoute({

                         referencePoints: [

                             pointA,

                             pointB

                         ],

                         params: {

                             //Тип маршрутизации - пешеходная маршрутизация.

                             routingMode: 'pedestrian',

                         },

                     }, {

                             // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.

                             //boundsAutoApply: true

                             wayPointIconLayout: "none",

                             routeActivePedestrianSegmentStrokeStyle: "solid",

                             routeActiveStrokeColor: "3aa5ed",

                             pinActiveIconFillColor: "000000",

                         });

     

                     var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

                         hintContent: 'Большая Сухаревская площадь, дом 9',

                         balloonContent: 'Большая Сухаревская площадь, дом 9'

                     }, {

                             // Опции.

                             // Необходимо указать данный тип макета.

                             iconLayout: 'default#image',

                             // Своё изображение иконки метки.

                             iconImageHref: '../images/map-icon.svg',

                             // Размеры метки.

                             iconImageSize: [20, 30],

                             // Смещение левого верхнего угла иконки относительно

                             // её "ножки" (точки привязки).

                             iconImageOffset: [-10, -30]

                         });

     

                     var layer = myMap.layers.get(0).get(0);

                     // Отслеживаем событие окончания отрисовки тайлов.

                     waitForTilesLoad(layer).then(function () {

                         // console.log('Карта загружена');

                     });

     

                     myMap.geoObjects.add(myPlacemark);

                     myMap.geoObjects.add(multiRoute);

                     myMap.behaviors.disable('scrollZoom');

                 });

             })

     

             

     

         }

     

         // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 

         function waitForTilesLoad(layer) {

             return new ymaps.vow.Promise(function (resolve, reject) {

                 var tc = getTileContainer(layer),

                     readyAll = true;

                 tc.tiles.each(function (tile, number) {

                     if (!tile.isReady()) {

                         readyAll = false;

                     }

                 });

                 if (readyAll) {

                     resolve();

                 } else {

                     tc.events.once("ready", function () {

                         resolve();

                     });

                 }

             });

         }

     

         function getTileContainer(layer) {

             for (var k in layer) {

                 if (layer.hasOwnProperty(k)) {

                     if (

                         layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||

                         layer[k] instanceof ymaps.layer.tileContainer.DomContainer

                     ) {

                         return layer[k];

                     }

                 }

             }

             return null;

         }

     

         // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)

         function loadScript(url, callback) {

             var script = document.createElement("script");

     

             if (script.readyState) { // IE

                 script.onreadystatechange = function () {

                     if (script.readyState == "loaded" ||

                         script.readyState == "complete") {

                         script.onreadystatechange = null;

                         callback();

                     }

                 };

             } else { // Другие браузеры

                 script.onload = function () {

                     callback();

                 };

             }

     

             script.src = url;

             document.getElementsByTagName("head")[0].appendChild(script);

         }

     

         // Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"

         var ymap = function () {

             

             // myMap.destroy()

             

     

     

             // if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

     

             //     // Чтобы не было повторной загрузки карты, мы изменяем значение переменной

             //     check_if_load = true;

     

             //     // Показываем индикатор загрузки до тех пор, пока карта не загрузится

             //     // spinner.addClass('is-active');

     

                 // Загружаем API Яндекс.Карт

             loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=Map&loadByRequire=1", function () {

                     // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map"

                     ymaps.load(init);

                 });

             // }

         }

     

         $(function () {

             //Запускаем основную функцию

             ymap();

     

         });

     })

     

     
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

     
     

     
     ;

     (function() {

         $('.object-select__slider-cards').slick({

             slidesToShow: 1,

             slidesToScroll: 1,

             arrows: true,

             fade: false,

             asNavFor: '.object-select__slider-nav',

             adaptiveHeight: true,

             autoplay: true,

             autoplaySpeed: 3000,

     

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

     
     

     
     

     
     

     
     

     
     

     
     
    
    
});
