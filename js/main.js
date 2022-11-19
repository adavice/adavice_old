/**
 * =============================================================================
 * Main Adavice themes Javascript functions
 * =============================================================================
 * @package Adavice 
 * 
 */
"use strict";
var App = function($) {




	/**
     * =========================================================================
	 * Method to render count
     * =========================================================================
     * @param element     | $ element which was increment
     * @param clearNumber | end number without aditional sumbols
     * @param plusOrNot   | aditional sumbol
     * @return void
     * 
     */
	function counter(element, clearNumber, plusOrNot){
		var number = 0;
        var count = Math.round(clearNumber / 20);
        
		var interval = setInterval(function() {
			 element.text(number + plusOrNot);
			 if (number >= clearNumber) clearInterval(interval);
			 number = number + ((count > 0) ? count : 1);
		}, 50);
	}



	/**
     * =========================================================================
	 * Counter numbers handler
     * =========================================================================
     * @let adavice_counter
     * @return void
     * 
     */
    let adavice_counter = {
        init: function ($) {
            var mark = true;
            if($('.counter_number').length){
                $(window).scroll(function(){
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    var $counter = $('.counter_number');

                    if(scrollTop >= ($counter.offset().top - (window.innerHeight)) && mark){
                        $counter.each(function(){
                            var clearNumber = Number($(this).text().match(/\d+/g)),
                                plusOrNot = $(this).text().split(clearNumber)['1'];
                            counter($(this), clearNumber, plusOrNot);
                        })
                        mark = false;
                    }
                });
            }
        }
    };



	/**
     * =========================================================================
	 * OWL carousel
     * =========================================================================
     * @author <owlcarousel2.github.io>
     * @option "https://owlcarousel2.github.io/OwlCarousel2/docs/api-options/"
     * @let carousel
     * @return void
     * 
     */
    
    let carousel = {
        init: function ($) {

            var $team = $('.team_content_carousel');
            
            $team.owlCarousel({
                nav: false,
                loop: true,
                margin: 0,
                navRewind: true,
                autoplay: true,
                autoplayTimeout:5000,
                responsive: {
                    0: {
                        items: 1
                    },
                }
            });

            var $events = $('.international_content');

            $events.owlCarousel({
                nav: false,
                loop: true,
                margin: 10,
                navRewind: true,
                autoplay: true,
                autoplayTimeout:5000,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    991: {
                        items: 3
                    },
                    1199: {
                        items: 4
                    },
                }
            });

        }
    };



	/**
     * =========================================================================
	 * Mobile Menu Element
     * =========================================================================
     * @let ninja
     * @return void
     *
     */
    let ninja = {
        init: function($){
            $(".ninja-btn").click( function() {
                $(this).closest('.menu').toggleClass("active");
            });
        }
    }



	/**
     * =========================================================================
	 * Menu Animations
     * =========================================================================
     * @let menubar
     * @return void
     * 
     */
    let menubar = {
        init: function($){
            
            var header = $('header');

            window.onscroll = function() {

                if ((window.pageYOffset || document.documentElement.scrollTop) >= window.innerHeight) {
                    header.addClass("sticky");
                } else {
                    header.removeClass("sticky");
                }
            }
        }
    }
    
	
	/**
     * =========================================================================
	 * Pop up
     * =========================================================================
     * @let menubar
     * @return void
     * 
     */
/*	let popup = {
		init: function($){
            
			if(window.localStorage.getItem('subscribeAdaviceX') != 'true'){
                $('.popup_content').show();
            }
            $('.close_popup_email').on('click', function(){
                $('.popup').hide();
            });

			$('.close_popup').on('click', function(){
                $('.popup_content').hide();
            });

            $('.popup_content').find('form').on('submit', function(e){
                e.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "/wp-admin/admin-ajax.php",
                    data: {
                        action: 'subscribe',
                        email: $('.popup_content').find('input[type=email]').val()
                    },
                    success: function (response){
                        $('.popup_content').hide();
                        window.localStorage.setItem('subscribeAdaviceX', true);
                    }
                })
            })
		}
    }*/
    

    let gallery = {
        init: function($){
            var $items = $('.quarterly_galery').children();

            $items.splice(-1,1);

            $items.each(function(index) {
                if(index >= 6){
                    $(this).addClass('image-hidden');
                }
            })

            var cache = 0;
            var loop = setInterval(function(){

                var random = Math.floor(Math.random() * $items.length) + 6;
                $($items[random]).removeClass('image-hidden');

            }, 2500);

            var after = 2500 * ($items.length - 6);

            setTimeout(function(){
                clearInterval(loop);

            }, after)

        }
    }

    return {
        init: function($) {
            adavice_counter.init($);
            carousel.init($);
            ninja.init($);
            menubar.init($);
            gallery.init($);
        }
    }

}();



jQuery(document).ready(function($) {
    App.init($);
    AOS.init($);


    $(window).load(function() {
        var interval = 1500;
        setTimeout(function(){
            $("#status").addClass('preloader-hide');
            $("#preloader").addClass('preloader-hide');
            $('body').addClass('run');
        }, interval)
    })
    
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        $('.popup').show();
    }, false );

});