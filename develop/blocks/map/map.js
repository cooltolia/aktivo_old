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