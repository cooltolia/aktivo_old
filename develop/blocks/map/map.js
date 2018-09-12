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
                //balloonContent: 'Это красивая метка'
            }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '../images/map-icon.png',
                    // Размеры метки.
                    iconImageSize: [30, 30],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-15, -30]
                });

            // myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
        });

    });
})();