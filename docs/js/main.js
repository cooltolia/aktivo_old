jQuery,$.noConflict(),jQuery(document).ready(function(e){var t,s,i,a,n,o,l,r,c,d,u,m,v;e("body").removeClass("pageload"),e(".about-team__slider").slick({slidesToShow:4,slidesToScroll:2,arrows:!0,dots:!1,infinite:!0,responsive:[{breakpoint:1200,settings:{slidesToShow:3}},{breakpoint:769,settings:{slidesToShow:2,arrows:!1}},{breakpoint:481,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1,centerMode:!0,centerPadding:"30px",adaptiveHeight:!0}}]}),e(".about-team__slider").on("beforeChange",function(t,s,i,a){e(i).addClass("active")}),t=e(".authorization__toggle"),s=e(".authorization__logged"),i=e(".authorization__list"),s.on("click",function(){t.toggleClass("active"),i.hasClass("active")?(i.slideUp(),i.removeClass("active")):(i.slideDown(),i.addClass("active"))}),$inputs=e(".base-input__input"),$autocompleteInputs=e(".base-input-autocomplete"),$inputs.each(function(){""!==e(this).val().trim()&&e(this).addClass("hasValue"),e(this).on("blur",function(){""!==e(this).val().trim()?e(this).addClass("hasValue"):e(this).removeClass("hasValue")})}),$autocompleteInputs.each(function(){var t=e(this).find("input"),s=e(this).find("label");t.on("focus",function(){s.addClass("js-focus")}),t.on("blur",function(){s.removeClass("js-focus")})}),a=e(".base-select__input"),n=e(".base-select__options-list"),o=e(".base-select__options-item"),0!=a.length&&(""!==a.val().trim()&&a.addClass("hasValue"),a.on("blur",function(){""!==a.val().trim()?a.addClass("hasValue"):a.removeClass("hasValue")}),a.on("click",function(){a.parent().addClass("active"),n.slideDown()}),o.each(function(){e(this).on("click",function(t){var s=e(this).text();a.val(s),a.addClass("hasValue"),a.parent().removeClass("active"),n.slideUp()})})),function(){if($chart=e("#top_x_div"),0!==$chart.length){var t=d3.format(".2f"),s=function(e){return e+="",(e=new Array(4-e.length%3).join("U")+e).replace(/([0-9U]{3})/g,"$1 ").replace(/U/g,"")},i=new Highcharts.chart("top_x_div",{chart:{type:"column",backgroundColor:"rgba(255, 255, 255, 0)"},title:{text:""},colors:["#e7acee","#f0d561","#8589f8","#aaed96"],legend:{align:"left",itemDistance:20,itemStyle:{font:'12px "Segoe UI"',color:"#000"},useHTML:!0,labelFormatter:function(){return'<span title="'+this.name+'"><span class="gals"></span>'+this.name+"</span>"}},xAxis:{categories:["2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041"]},yAxis:{min:0,title:{text:""}},tooltip:{pointFormatter:function(){var e=this.series.name,i=this.series.chart.series.slice(-1)[0].data[0].y;return'<div class="row"><div class="label">'+e+'</div><div class="proc">'+(1===this.series.index||3===this.series.index?"":t(this.y/i*100)+"%")+'</div><div class="income">'+s(this.y)+"  р.</div></div>"},shared:!0,useHTML:!0,valueDecimal:0},plotOptions:{column:{stacking:"total"}},series:[{name:"Рентный доход",data:[]},{name:"Накопленный рентный доход",data:[]},{name:"Рост стоимости",data:[]},{name:"Стоимость актива",data:[]}]}),a={rentKoeff:[.11,.116,.121,.127,.134,.14,.147,.155,.163,.171],capKoeff:[0,.05,.05,.05,.05,.05,.05,.05,.05,.05]},n=(e("input#summ1-range").rangeslider({polyfill:!1,onSlide:function(e,t){n(1,t,!0)},onSlideEnd:function(e,t){n(1,t,!1)}}),e("input#summ2-range").rangeslider({polyfill:!1,onSlide:function(e,t){n(2,t,!0)},onSlideEnd:function(e,t){n(2,t,!1)}}),function(n,o,l){void 0===l&&(l=!1);var r=e("#summ1-range"),c=1===n?o:r.val(),d=e("#summ2-range"),u=2===n?o:d.val(),m=function(e,t,s){for(var i=t,a=0;a<e;a++)0===a?i/=s.rentKoeff[a]:i+=i*s.capKoeff[a];return Math.ceil(i)}(1,c,a),v=function(e,t,s){for(var i=[],a=[],n=[],o=[],l=0;l<t;l++)i[l]=0===l?Math.ceil(e):Math.ceil(i[l-1]+n[l-1]),a[l]=Math.ceil(e*s.rentKoeff[l]),o[l]=0===l?0:o[l-1]+a[l-1],n[l]=0===l?0:Math.ceil(i[l]*s.capKoeff[l]);return{capitalization:n,rent:a,accumulated_rent:o,investment:i}}(m,u,a);!1===l&&(i.series[0].setData(v.rent),i.series[1].setData(v.accumulated_rent),i.series[2].setData(v.capitalization),i.series[3].setData(v.investment));var p=v.accumulated_rent[u-1]+v.rent[u-1],h=100*p/m,f=v.capitalization.reduce(function(e,t){return e+t}),g=(v.investment[u-1]+v.capitalization[u-1]-m)/m*100,b=p+v.investment[u-1]+v.capitalization[u-1],x=(b-m)/m*100;e("#summ2, #vyear").text(function(e){switch(parseInt(e)){case 1:return"1 год";case 2:case 3:case 4:return e+" года";default:return e+" лет"}}(u)),e("#result1").text(s(b)),e("#result1_percent").text("+"+t(x)+"%"),e("#result2").text(s(p)),e("#result2_percent").text("+"+t(h)+"%"),e("#result3").text(s(f)),e("#result3_percent").text("+"+t(g)+"%"),e("#result4").text(s(m)),e("#summ1").html(s(c)),e("#summ1-scroll").find(".rangeslider__handle").html('<div class="tooltip2"><div class="title">Инвестировать от</div><div class="summ-t">'+s(m)+'<span class="ruble"/></div></div>'),c>=19e5?e("#summ1-scroll").addClass("no-right"):e("#summ1-scroll").removeClass("no-right")});n()}}(),function(){var e,t=document.getElementsByClassName("contacts-offices__title");if(t)for(e=0;e<t.length;e++)t[e].addEventListener("click",function(){if(this.classList.contains("active"))return this.classList.remove("active"),(s=this.nextElementSibling).style.maxHeight||""===s.style.maxHeight?s.style.maxHeight=null:s.style.maxHeight=s.scrollHeight+"px",void s.classList.remove("active");for(e=0;e<t.length;e++)t[e].classList.remove("active");this.classList.add("active");var s=this.nextElementSibling,i=document.querySelectorAll(".contacts-offices__data");for(e=0;e<i.length;e++)i[e].style.maxHeight=null,i[e].classList.remove("active");s.style.maxHeight?s.style.maxHeight=null:s.style.maxHeight=s.scrollHeight+"px"})}(),function(){var t=e(".documents-content__title");e(".documents-content__table-wrapper");t.on("click",function(){e(this).hasClass("active")?(e(this).next().slideUp(),e(this).removeClass("active")):(e(this).next().slideDown(),e(this).addClass("active"))})}(),function(){var e,t,s=document.getElementsByClassName("faq-content__question"),i=document.querySelector(".faq-content__question");if(s&&i){var a=i.offsetHeight;for(t=0;t<s.length;t++)s[t].style.top=a*t+"px";for(e=0;e<s.length;e++)s[e].addEventListener("click",function(){if(this.classList.contains("active")){this.classList.remove("active");var t=this.getAttribute("data-for");return(i=document.querySelector("[data-id="+t+"]")).style.maxHeight||""===i.style.maxHeight?i.style.maxHeight=null:i.style.maxHeight=i.scrollHeight+"px",void i.classList.remove("active")}for(e=0;e<s.length;e++)s[e].classList.remove("active");this.classList.add("active");t=this.getAttribute("data-for");var i=document.querySelector("[data-id="+t+"]"),a=document.querySelectorAll(".faq-content__answer");for(e=0;e<a.length;e++)a[e].style.maxHeight=null,a[e].classList.remove("active");i.style.maxHeight?i.style.maxHeight=null:i.style.maxHeight=i.scrollHeight+"px"})}}(),l=e(".mobile-nav"),e(".hamburger").click(function(){e(this).toggleClass("active"),l.toggleClass("active"),l.hasClass("active")?(l.fadeIn(),e("body").css("overflow","hidden")):(l.fadeOut(),e("body").css("overflow","auto"))}),function(){function t(){e(".invest-steps__list").slick({mobileFirst:!0,slidesToShow:1,arrows:!1,dots:!1,infinite:!0,variableWidth:!0,autoplay:!0,autoplaySpeed:3e3,responsive:[{breakpoint:768,settings:{slidesToShow:2.1,variableWidth:!1,centerMode:!0,centerPadding:"30px"}},{breakpoint:1024,settings:{slidesToShow:3.05,variableWidth:!1,centerMode:!0,centerPadding:"30px"}},{breakpoint:1240,settings:"unslick"}]})}t();var s,i,a,n,o=(s=function(){e(".invest-steps__list").hasClass("slick-initialized")||t()},i=250,function(){var e=this,t=arguments,o=a&&!n;clearTimeout(n),n=setTimeout(function(){n=null,a||s.apply(e,t)},i),o&&s.apply(e,t)});window.addEventListener("resize",o)}(),(r=e(".liberty-slider__slider")).on("init",function(t,s,i){var a=e(s.$slides[s.currentSlide]),n=a.next(),o=a.prev();o.addClass("slick-sprev"),n.addClass("slick-snext"),a.removeClass("slick-snext").removeClass("slick-sprev"),s.$prev=o,s.$next=n}).on("beforeChange",function(t,s,i,a){var n=e(s.$slides[a]);s.$prev.removeClass("slick-sprev"),s.$next.removeClass("slick-snext");var o=n.next(),l=n.prev();l.prev(),l.next(),l.addClass("slick-sprev"),o.addClass("slick-snext"),s.$prev=l,s.$next=o,n.removeClass("slick-next").removeClass("slick-sprev")}),r.slick({speed:500,arrows:!0,dots:!1,focusOnSelect:!0,infinite:!0,centerMode:!0,slidesPerRow:1,slidesToShow:1,slidesToScroll:1,centerPadding:"0",swipe:!0,autoHeight:!0}),(new WOW).init(),c=[55.747115,37.539078],"undefined"!=typeof ymaps&&ymaps.ready(function(){var e;ymaps.geocode(c).then(function(t){e=new ymaps.Map("map",{center:t.geoObjects.get(0).geometry.getCoordinates(),zoom:16});var s=new ymaps.Placemark(e.getCenter(),{hintContent:"Пресненская наб., д.8, стр.1"},{preset:"islands#yellowStretchyIcon"});e.geoObjects.add(s),e.behaviors.disable("scrollZoom")})}),e(".modal").each(function(){e(this).on("shown.bs.modal",function(t){"modal2"===t.target.getAttribute("id")&&"function"==typeof grecaptcha.execute&&grecaptcha.execute();var s=e(this).find("input")[0];s&&s.focus();var i=e(this).find('input[name="phone"]'),a=e(this).find('button[name="submit"]');Inputmask.isValid(i.val(),{inputFormat:"+7 (999) 999 99 99"})&&a.attr("disabled",!1),i.inputmask("+7 (999) 999 99 99",{onKeyValidation:function(e,t){},oncomplete:function(){a.attr("disabled",!1)},onincomplete:function(){a.prop("disabled",!0)}})})}),e("#modal5").on("show.bs.modal",function(t){var s=e(t.relatedTarget),i=s.data("service"),a=s.data("button"),n=e(this);n.find('input[name="service"]').val(i),n.find('button[name="submit"]').text(a)}),e("#income-monitoring").length&&Highcharts.chart("income-monitoring",{chart:{zoomType:"xy"},title:{text:""},exporting:{enabled:!1},plotOptions:{line:{dataLabels:{align:"center",enabled:!0,color:"black",padding:10,style:{textOutline:"none",fontSize:"14px",fontWeight:"400"},formatter:function(){return this.y+"%"}}}},xAxis:[{categories:["Фев 18","Мар 18","Апр 18","Май 18","Июн 18","Июл 18"],crosshair:!1,labels:{style:{color:"rgba(0, 0, 0, 0.4)",fontSize:"9px"}}}],yAxis:[{visible:!1,min:0,max:35},{max:2500,title:{text:""},labels:{style:{color:"rgba(0, 0, 0, 0.4)",fontSize:"9px"}}}],legend:{enabled:!1},credits:{enabled:!1},series:[{name:"Сумма выплат",type:"column",yAxis:1,data:[2500,1700,1200,1600,1250,650],color:"#3c7bd8",tooltip:{valueSuffix:" 000 руб"}},{name:"Доходность",type:"line",data:[5,10,20,30,20,15],color:"#ffd729",tooltip:{valueSuffix:"%"}}]}),function(){var t=e(".monitoring-objects__nav-item");e(".monitoring-objects__section");t.each(function(t,s){e(s).on("click",function(){if(!e(s).hasClass("active")){e(".monitoring-objects__nav-item.active").removeClass("active"),e(".monitoring-objects__section.active").removeClass("active").fadeOut();var t=e(s).data("for"),i=e('[data-id="'+t+'"');e(s).addClass("active"),i.addClass("active").fadeIn()}})})}(),function(){var t=e(".monitoring-objects__nav-item");e(".monitoring-objects__section");t.each(function(t,s){e(s).on("click",function(){if(!e(s).hasClass("active")){e(".monitoring-objects__nav-item.active").removeClass("active"),e(".monitoring-objects__section.active").removeClass("active").fadeOut();var t=e(s).data("for"),i=e('[data-id="'+t+'"');e(s).addClass("active"),i.addClass("active").fadeIn()}})})}(),function(){var e=document.getElementById("monitoring-finances");if(e){var t=[{name:"Супермаркет Пятерочка",data:100,color:"#5fce67"},{name:"Супермаркет Десяточка",data:30,color:"#3c7bd8"},{name:"Минимаркет Двоечка",data:50,color:"#ffd729"},{name:"Минимаркет Нулевочка",data:10,color:"#f52f4b"}];Highcharts.chart(e,{chart:{type:"pie",margin:[0,0,0,0],spacingTop:0,spacingBottom:0,spacingLeft:0,spacingRight:0},credits:{enabled:!1},title:{text:""},plotOptions:{pie:{cursor:"pointer",dataLabels:{enabled:!1},startAngle:-45,borderColor:null,size:"100%"}},tooltip:{pointFormat:"<b>{point.y} руб</b>",percentageDecimals:2},series:[{name:"",data:[{name:t[0].name,y:t[0].data,color:t[0].color},{name:t[1].name,y:t[1].data,color:t[1].color},{name:t[2].name,y:t[2].data,color:t[2].color},{name:t[3].name,y:t[3].data,color:t[3].color}],innerSize:"83%"}]})}}(),function(){e("input#object_summ1-range").rangeslider({polyfill:!1,onSlide:function(e,s){t(1,s,!0)},onSlideEnd:function(e,s){t(1,s,!1)}});var t=function(t,s,i){void 0===i&&(i=!1);var a,n=e("#object_summ1-range"),o=1===t?s:n.val();e("#object_summ1").html((a=o,a+="",(a=new Array(4-a.length%3).join("U")+a).replace(/([0-9U]{3})/g,"$1 ").replace(/U/g,"")))};t();var s=e(".object-calculator__slider").outerHeight(!0);e(".object-calculator__col.offset-top").css("margin-top",-s+"px")}(),function(){var t,s,i=document.querySelectorAll(".object-content .js-link"),a=(document.querySelectorAll(".object-content__label"),document.querySelector(".object-content .js-link"));if(i&&a){var n=a.offsetHeight;for(s=0;s<i.length;s++)i[s].style.top=n*s+"px";document.querySelector(".object-content__calculate");if(window.matchMedia("(max-width: 1024px)").matches)for(t=0;t<i.length;t++)i[t].addEventListener("click",function(e){if(e.preventDefault(),this.classList.contains("active")){this.classList.remove("active");var s=this.getAttribute("href");return(a=document.querySelector(s)).style.maxHeight||""===a.style.maxHeight?a.style.maxHeight=null:a.style.maxHeight=a.scrollHeight+"px",void a.classList.remove("active")}for(t=0;t<i.length;t++)i[t].classList.remove("active");this.classList.add("active");s=this.getAttribute("href");var a=document.querySelector(s),n=document.querySelectorAll(".object-content__block");for(t=0;t<n.length;t++)n[t].style.maxHeight=null,n[t].classList.remove("active");a.style.maxHeight?a.style.maxHeight=null:a.style.maxHeight=a.scrollHeight+"px"});else i.forEach(function(s){s.addEventListener("click",function(){for(t=0;t<i.length;t++)i[t].classList.remove("active");this.classList.add("active");var s=this.getAttribute("href");!function(t,s){e("html, body").animate({scrollTop:e(t).offset().top},s)}(document.querySelector(s),500)})});e(".object-content__slider").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0})}}(),function(){var e=document.getElementById("financies-chart");if(e){Highcharts.chart(e,{chart:{type:"pie",margin:[0,0,0,0]},credits:{enabled:!1},title:{text:""},plotOptions:{pie:{cursor:"pointer",dataLabels:{enabled:!1},startAngle:-90,borderColor:null,size:"100%"}},tooltip:{pointFormat:"<b>{point.y} руб</b>",percentageDecimals:2},series:[{name:"",data:[{name:"Расходы",y:3781927,color:"#f52f4b"},{name:"Чистый операционный доход",y:20478426,color:"#5fce67"}],innerSize:"83%",index:1},{name:"second",data:[{name:"Расходы",y:3781927,color:"#f52f4b"},{name:"Комиссия",y:2559803,color:"#3c7bd8"},{name:"Прибыль к распределению",y:17918623,color:"#ffd729"}],innerSize:"67%",index:0}]})}}(),d=[1.3,1.08,.71,.98,.78,.38,1.3,1.08,.71,.98,.78,.38,1.3,1.08,.71,.98,.78,.38],u=e("#income-chart"),m=25*d.length*1.5,console.log(m),setTimeout(()=>{new SimpleBar(u.find(".highcharts-scrolling")[0],{autoHide:!1})},1e3),u.length&&Highcharts.chart("income-chart",{chart:{zoomType:"xy",scrollablePlotArea:{minWidth:m}},title:{text:""},exporting:{enabled:!1},plotOptions:{line:{dataLabels:{align:"center",enabled:!0,color:"black",padding:10,style:{textOutline:"none",fontSize:"14px",fontWeight:"400"}}},column:{pointWidth:25}},xAxis:[{categories:["Фев 18","Мар 18","Апр 18","Май 18","Июн 18","Июл 18"],crosshair:!1,labels:{style:{color:"rgba(0, 0, 0, 0.4)",fontSize:"9px"}},min:0,scrollbar:{enabled:!0,barBackgroundColor:"#ffd729",barBorderRadius:2,barBorderWidth:0,buttonBackgroundColor:"transparent",buttonBorderWidth:0,buttonArrowColor:"transparent",buttonBorderRadius:0,rifleColor:"transparent",trackBackgroundColor:"#e9e9e9",trackBorderWidth:0,height:4}}],yAxis:[{visible:!1,softMax:1.3},{title:{text:""},labels:{style:{color:"rgba(0, 0, 0, 0.4)",fontSize:"9px"}},opposite:!1,visible:!0,tickInterval:10,softMax:2200}],legend:{enabled:!1},credits:{enabled:!1},series:[{name:"Сумма выплат",type:"column",yAxis:1,data:[2100,1700,1200,1600,1250,650,2100,1700,1200,1600,1250,650,2100,1700,1200,1600,1250,650,2100,1700],color:"#3c7bd8",tooltip:{valueSuffix:" 000 руб"},states:{inactive:{opacity:.8}}},{name:"Доходность",type:"line",data:d,color:"#ffd729",tooltip:{valueSuffix:"млн руб"},states:{inactive:{opacity:.8}}}]}),function(){var e=[55.747115,37.539078];"undefined"!=typeof ymaps&&ymaps.ready(function(){var t;ymaps.geocode(e).then(function(e){t=new ymaps.Map("object-map",{center:e.geoObjects.get(0).geometry.getCoordinates(),zoom:16});var s=new ymaps.Placemark(t.getCenter(),{hintContent:"Пресненская наб., д.8, стр.1"},{preset:"islands#yellowStretchyIcon"});t.geoObjects.add(s),t.behaviors.disable("scrollZoom")})})}(),e(".object-planning__images").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0}),e(".object-select__slider-cards").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!1,asNavFor:".object-select__slider-nav",adaptiveHeight:!0}),e(".object-select__slider-nav").slick({slidesToShow:4,slidesToScroll:1,asNavFor:".object-select__slider-cards",dots:!1,arrows:!1,focusOnSelect:!0,responsive:[{breakpoint:1240,settings:{slidesToShow:3}},{breakpoint:1024,settings:{slidesToShow:2,centerMode:!0,centerPadding:"5px"}},{breakpoint:480,settings:{slidesToShow:1,centerMode:!0,centerPadding:"5px"}}]}),function(){var t=e(".partner-slider__slider");t.on("init",function(t,s,i){var a=e(s.$slides[s.currentSlide]),n=a.next(),o=e(s.$slides[s.$slides.length-1]);o.addClass("slick-sprev"),n.addClass("slick-snext"),a.removeClass("slick-snext").removeClass("slick-sprev"),s.$prev=o,s.$next=n}).on("beforeChange",function(t,s,i,a){const n=s.$slides.length;var o,l,r=e(s.$slides[a]);s.$prev.removeClass("slick-sprev"),s.$next.removeClass("slick-snext"),a===n-1?(o=r.prev(),l=e(s.$slides[0])):i>a&&0===a?(l=r.next(),o=e(s.$slides[n-1])):(l=r.next(),o=r.prev()),o.addClass("slick-sprev"),l.addClass("slick-snext"),s.$prev=o,s.$next=l,r.removeClass("slick-next").removeClass("slick-sprev")}),t.slick({speed:500,arrows:!0,dots:!1,focusOnSelect:!0,infinite:!0,centerMode:!0,slidesPerRow:1,slidesToShow:1,slidesToScroll:1,centerPadding:"0",swipe:!0,adaptiveHeight:!0})}(),(new WOW).init(),function(){0!==e(".partners-content").length&&(e(".partners-content__chart").each(function(){!function(e,t){new Highcharts.chart(e,{chart:{type:"column",backgroundColor:"rgba(255, 255, 255, 0)"},credits:{enabled:!1},title:{text:""},colors:["#3C7BD8"],legend:!1,xAxis:{categories:["Переходы","Регистрации","Сделки"],labels:{style:{fontSize:"9px"}}},yAxis:{min:0,title:{text:""},labels:{enabled:!1}},plotOptions:{column:{dataLabels:{enabled:!0,padding:0,style:{color:"#000000",fontSize:"12px",fontWeight:"700"}}}},series:[{name:"Количество",data:t}]})}(e(this).attr("id"),e(this).data("values"))}),e(".partners-content__copy").on("click",function(t){t.preventDefault();var s=e(this);s.addClass("clicked"),s.prop("disabled",!0);var i=s.prev().find("input")[0];i.disabled=!1,i.select(),i.setSelectionRange(0,99999),document.execCommand("copy"),i.disabled=!0,setTimeout(function(){s.removeClass("clicked"),s.prop("disabled",!1)},500)}))}(),function(){var t=e(".security-slider__slider");t.on("init",function(t,s,i){var a=e(s.$slides[s.currentSlide]),n=a.next(),o=a.prev();o.addClass("slick-sprev"),n.addClass("slick-snext"),a.removeClass("slick-snext").removeClass("slick-sprev"),s.$prev=o,s.$next=n}).on("beforeChange",function(t,s,i,a){var n=e(s.$slides[a]);s.$prev.removeClass("slick-sprev"),s.$next.removeClass("slick-snext");var o=n.next(),l=n.prev();l.prev(),l.next(),l.addClass("slick-sprev"),o.addClass("slick-snext"),s.$prev=l,s.$next=o,n.removeClass("slick-next").removeClass("slick-sprev")}),t.slick({speed:500,arrows:!0,dots:!1,focusOnSelect:!0,infinite:!0,centerMode:!0,slidesPerRow:1,slidesToShow:1,slidesToScroll:1,centerPadding:"0",swipe:!0})}(),function(){var e,t=document.getElementsByClassName("vacancies__title");if(t)for(e=0;e<t.length;e++)t[e].addEventListener("click",function(){if(this.classList.contains("active"))return this.classList.remove("active"),(s=this.nextElementSibling).style.maxHeight||""===s.style.maxHeight?s.style.maxHeight=null:s.style.maxHeight=s.scrollHeight+"px",void s.classList.remove("active");for(e=0;e<t.length;e++)t[e].classList.remove("active");this.classList.add("active");var s=this.nextElementSibling,i=document.querySelectorAll(".vacancies__description");for(e=0;e<i.length;e++)i[e].style.maxHeight=null,i[e].classList.remove("active");s.style.maxHeight?s.style.maxHeight=null:s.style.maxHeight=s.scrollHeight+"px"})}(),0!=(v=e(".verification-passport .tt-dropdown-menu")).length&&new SimpleBar(v[0],{autoHide:!1}),function(){e(".verification-upload__form").each(function(){var t,s;console.log(e(this)),t=e(this)[0],(s=new Dropzone(t,{url:"upload.php",maxFiles:1,maxFilesize:10,addRemoveLinks:!0,thumbnailWidth:"190",thumbnailHeight:"250"})).on("removedfile",function(e){}),s.on("uploadprogress",function(t){e(t.previewElement).siblings(".add"),e(t.previewElement).find(".dz-upload").css("opacity",1)}),s.on("success",function(t){e(t.previewElement).find(".dz-upload").css("opacity",0)}),s.on("error",function(t){e(t.previewElement).find(".dz-upload").css("opacity",0)})})}()});