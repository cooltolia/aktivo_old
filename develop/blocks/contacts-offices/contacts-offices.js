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