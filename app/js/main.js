
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

     
     ;(function () {

     

         $('.cases__list').slick({

             infinite: true,

             slidesToShow: 1,

             slidesToScroll: 1,

             adaptiveHeight: true,

             responsive: [

                 {

                     breakpoint: 769,

                     settings: {

                         dots: true,

                         arrows: false,

                     }

                 }

             ]

         });

     

     })();

     
     

     
     

     
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

     
     

     

     $(document).ready(function () {

     

         var data = [

         {

             id: 'isk',

             text: '<div class="selected__option">Написание иска</div>',

             html: '<div class="option__title">Написание иска</div><div class="option__price">10 000р.</div>',

             title: 'Написание иска',

             price: '10 000'

         }, {

             id: 'buisness',

             text: '<div class="selected__option">Защита бизнеса</div>',

             html: '<div class="option__title">Защита бизнеса</div><div class="option__price">20 000р.</div>',

             title: 'Защита бизнеса',

             selected: true,

             price: '20 000'

         }, {

             id: 'court',

             text: '<div class="selected__option">Представительство в суде</div>',

             html: '<div class="option__title">Представительство в суде</div><div class="option__price">30 000р.</div>',

             title: 'Представительство в суде',

             price: '30 000'

         }

     

         ];

     

         $('.payForm__select').select2({

             data: data,

             escapeMarkup: function (markup) {

                 return markup;

             },

             templateResult: function (data) {

                 return data.html;

             },

             templateSelection: function (data) {

                 return data.text;

             },

             minimumResultsForSearch: Infinity,

             allowEmpty: true,

             placeholder: 'Выберите услугу',

             width: '100%'

         });

     

         var $sum = $('.payForm__result-sum');

     

         var data = $(".payForm__select").select2('data');

     

         if (data)

             var price  = data[0].price;

     

         $sum.val(price + ' р.')

     

         $('.payForm__select').on('select2:select', function (e) {

             var data = $(".payForm__select").select2('data');

             var price = data[0].price;

             

             $sum.val(price + ' р.')

         });

     

         $form = $('.payForm__form');

     

         $form.submit(function(e) {

             e.preventDefault();

             // debugger;

             let data = $(this).serializeArray();

     

             data[4].value = data[4].value.replace(/\D/g, '');

             console.log(data);

             

         })

     

         $(".payForm input[name='payPhone']").inputmask();

     });

     
     

     
     

     
     ;

     (function () {

     

         var $triggerService = $('.services__item.hasInner');

         var $innerList = $('.services__inner-list');

         var maxHeight = $innerList.outerHeight;

     

         $triggerService.on('click', function (e) {

             e.preventDefault();

             e.stopPropagation();

             $triggerService.toggleClass('active');

     

             if ($innerList.hasClass("expanded")) {

     

                 $innerList.removeClass("expanded");

                 $innerList.slideUp()

     

                 // $innerList.animate({

                 //     height: maxHeight

                 // }, 500);

     

             } else {

     

                 $innerList.addClass("expanded");

                 $innerList.slideDown()

     

                 // $innerList.animate({

                 //     height: $innerList.get(0).scrollHeight

                 // }, 500, function () {

                 //     $(this).height('auto')

                 // });

     

             }

         });

     })();

     
     

     
     

     
     

     
     

     
     

     
     ;(function () {

     

         /* var mouse = $('.top-screen__mouse'),

             mouseTopPosition = mouse.offset().top;

     

         $(window).on('scroll', function(e) {

     

             var windowTopPosition = $(window).scrollTop();

             

             mouse.css('transform', 'translate(-50%, -' + windowTopPosition + 'px)');

             mouse.animate({

                 opacity: 0

             }, 1500 );

         }) */

     

         var link = $('.top-screen__button--grey');

     

         link.on('click', function (e) {

             e.preventDefault();

             var target = $(this.hash);

     

             $('html, body').animate({

                 scrollTop: target.offset().top

             }, 1000);

         });

     

     

     })();

     

     
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
    
    (function () {
     /*    function logElementEvent(eventName, element) {
            console.log(new Date().getTime(), eventName, element.getAttribute('data-src'));
        }

        function logEvent(eventName, elementsLeft) {
            console.log(new Date().getTime(), eventName, elementsLeft + " images left");
        } */

        function createImageFragment(srcUrl) {
            var imageFragment = document.createElement('img');
            imageFragment.setAttribute('src', srcUrl);
            return imageFragment;
        }
        ll = new LazyLoad({
            threshold: 500,
            elements_selector: ".lazyload",
            callback_enter: function (element) {
                function callback_load(event) {
                    element.classList.add('loaded');
                    element.classList.remove('loading');
                    imageFragment.removeEventListener('load', callback_load);
                }
                var imageFragment = createImageFragment(element.getAttribute('data-src'));
                imageFragment.addEventListener('load', callback_load);
                element.classList.add('loading');              
            },
            callback_error: function (element) {
                // logElementEvent("ERROR", element);
                element.src = "https://placeholdit.imgix.net/~text?txtsize=21&txt=Fallback%20image&w=280&h=280";
            }
        });
    }());
});
