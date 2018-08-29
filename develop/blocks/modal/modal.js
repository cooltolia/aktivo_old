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