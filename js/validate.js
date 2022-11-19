jQuery(document).ready(function($){
    $('.popup_content').hide();

    $('#contact-form').on('submit', function (){
        var formData = {
            'name'              : $('#name').val(),
            'email'             : $('#email').val(),
            'phone'             : $('#phone').val(),
            'message'           : $('#message').val(),

        };
        $('#contact-form').prop('disabled', true);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'send_form_talk_to_us'});
        $.ajax({
            type        : 'POST',
            url         : '/c/contact_form',
            data        :  formData,
            encode      :  true,
            success: function(data){
                /*window.location.replace("./submitted.html");*/

                $('.popup_content').slideDown(300);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Something is wrong.");

            }
        });
        return false;
    });

    $('.close_popup_email').on('click', function(){
        $('.popup_content').fadeOut(500);
    });

    $('.file-i').on('change', Handlechange);
    function Handlechange(){
        var fileButton = document.getElementById("browse");
        var fileInput = document.getElementById("filename");
        $('#browse').addClass('chosen');

    }




});