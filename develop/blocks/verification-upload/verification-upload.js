;(function() {

    function initNewDropZone(target) {
        var dpopz = new Dropzone(target, {
            url: "upload.php",
            maxFiles: 1,
            maxFilesize: 10,
            addRemoveLinks: true,
            thumbnailWidth: "190",
            thumbnailHeight: "250",
        });

        dpopz.on("removedfile", function (file) {
            // var _this = this;
            // console.log(_this);
            // _this.element.remove();
            $('.add').css('opacity', 1);
        })

        dpopz.on("totaluploadprogress", function (progress) {
            var progr = document.querySelector(".progress .determinate");
            if (progr === undefined || progr === null) return;

            progr.style.width = progress + "%";
        });

        dpopz.on("dragenter", function () {
            $(".fileuploader").addClass("active");
        });

        dpopz.on("dragleave", function () {
            $(".fileuploader").removeClass("active");
        });

        dpopz.on("drop", function () {
            $(".fileuploader").removeClass("active");
        });

        dpopz.on('uploadprogress', function () {
            $('.dz-upload').css('opacity', 1);
            $('.add').css('opacity', 0);
        })

        dpopz.on('success', function () {
            $('.dz-upload').css('opacity', 0);
        })

        dpopz.on('error', function () {
            $('.dz-upload').css('opacity', 0);
        })
    }

    $('.verification-upload__form').each(function() {
        console.log($(this));
        
        initNewDropZone($(this)[0]);
    })

    

})();