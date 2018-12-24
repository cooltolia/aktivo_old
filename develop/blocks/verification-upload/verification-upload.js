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