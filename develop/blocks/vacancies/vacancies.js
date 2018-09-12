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